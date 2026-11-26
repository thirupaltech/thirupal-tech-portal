import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, BookOpen, Bot, CalendarDays, Check, CircleUserRound, LoaderCircle, LogOut, Send, Users } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { getCommunityRoute } from "../utils/communityRoutes";
import { useLocation } from "react-router-dom";
import { loginUser, registerUser } from "../services/userAuthService";
import type { CommunityMember } from "../services/userAuthService";
import { sendCommunityAiMessage } from "../services/communityAiService";

const sessionKey = "thirupal-community-member";
const tokenKey = "thirupal-community-token";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const chatMarkdownComponents: Components = {
  h1: ({ children }) => <h3 className="mb-3 mt-4 text-lg font-bold text-[#183a32] first:mt-0">{children}</h3>,
  h2: ({ children }) => <h3 className="mb-2 mt-4 text-base font-bold text-[#183a32] first:mt-0">{children}</h3>,
  h3: ({ children }) => <h4 className="mb-2 mt-3 text-sm font-bold text-[#183a32] first:mt-0">{children}</h4>,
  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="mb-3 ml-5 list-disc space-y-1 last:mb-0">{children}</ul>,
  ol: ({ children }) => <ol className="mb-3 ml-5 list-decimal space-y-1 last:mb-0">{children}</ol>,
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => <strong className="font-bold text-[#183a32]">{children}</strong>,
  blockquote: ({ children }) => <blockquote className="mb-3 border-l-2 border-[#8db49a] pl-3 text-slate-600">{children}</blockquote>,
  hr: () => <hr className="my-4 border-[#e4ece2]" />,
  a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="text-[#176347] underline underline-offset-2 hover:text-[#104e39]">{children}</a>,
  pre: ({ children }) => <pre className="my-3 max-w-full overflow-x-auto rounded-lg bg-[#183a32] p-4 text-xs leading-5 text-[#e7f2e9]">{children}</pre>,
  table: ({ children }) => (
    <div className="my-3 max-w-full overflow-x-auto rounded-lg border border-[#e4ece2]">
      <table className="w-full border-collapse text-left text-xs">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#edf3ed] text-[#183a32]">{children}</thead>,
  th: ({ children }) => <th className="border-b border-[#dce4da] px-3 py-2 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-b border-[#eef2ed] px-3 py-2 align-top">{children}</td>,
  code: ({ className, children }) => (
    <code className={className
      ? `${className} font-mono text-[0.8rem] text-inherit`
      : "rounded bg-[#edf3ed] px-1.5 py-0.5 font-mono text-[0.85em] text-[#285445]"}>
      {children}
    </code>
  ),
};

function readMember(): CommunityMember | null {
  try {
    return JSON.parse(sessionStorage.getItem(sessionKey) ?? "null") as CommunityMember | null;
  } catch {
    return null;
  }
}

export default function MyCommunityPage() {
  const location = useLocation();
  const [member, setMember] = useState<CommunityMember | null>(readMember);
  const [mode, setMode] = useState<"login" | "register">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [chatDraft, setChatDraft] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatBusy, setChatBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setBusy(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const result = mode === "register"
        ? await registerUser({ name: name.trim(), email: normalizedEmail, phone: phone.trim(), password })
        : await loginUser({ email: normalizedEmail, password });

      const signedInMember = result.member;
      sessionStorage.setItem(sessionKey, JSON.stringify(signedInMember));
      if (result.token) sessionStorage.setItem(tokenKey, result.token);
      else sessionStorage.removeItem(tokenKey);
      setMember(signedInMember);
      setPassword("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to complete your request. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function signOut() {
    sessionStorage.removeItem(sessionKey);
    sessionStorage.removeItem(tokenKey);
    setMember(null);
    setMode("login");
  }

  async function handleChatSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = chatDraft.trim();
    if (!question || chatBusy) return;

    setChatMessages((messages) => [...messages, { role: "user", content: question }]);
    setChatDraft("");
    setChatBusy(true);

    try {
      const answer = await sendCommunityAiMessage(question);
      setChatMessages((messages) => [...messages, { role: "assistant", content: answer }]);
    } catch (error) {
      setChatMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content: error instanceof Error ? error.message : "Unable to get a response from Community AI. Please try again.",
        },
      ]);
    } finally {
      setChatBusy(false);
    }
  }

  if (member) {
    return (
      <main className="min-h-[calc(100vh-5rem)] bg-[#f5f7f3] px-5 pb-16 pt-12 md:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="flex flex-wrap items-start justify-between gap-5 border-b border-[#dce4da] pb-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#59806d]">ThirupalTech / Community</p>
              <h1 className="mt-3 text-3xl font-bold text-[#183a32] md:text-4xl">Your community, {member.name.split(" ")[0]}.</h1>
              <p className="mt-2 text-slate-600">A place to learn, share, and take part in what is happening around you.</p>
            </div>
            <button type="button" onClick={signOut} className="inline-flex items-center gap-2 border border-[#cad7cc] px-4 py-2.5 text-sm font-semibold text-[#35564a] hover:bg-white">
              <LogOut size={16} /> Sign out
            </button>
          </header>

          <section className="grid items-start gap-8 py-8 lg:grid-cols-[1.4fr_0.8fr]">
            <section aria-labelledby="community-ai-heading" className="overflow-hidden border border-[#dce4da] bg-white shadow-sm">
              <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e7eee6] px-5 py-4 md:px-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e6f0e8] text-[#23845f]"><Bot size={23} /></span>
                  <div>
                    <h2 id="community-ai-heading" className="font-bold text-[#183a32]">Community AI</h2>
                    <p className="text-sm text-slate-500">Your guide to programs, events, and resources</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f2f6f1] px-3 py-1.5 text-xs font-semibold text-[#59806d]"><span className="h-2 w-2 rounded-full bg-[#23845f]" /> AI assistant</span>
              </header>

              <div className="flex min-h-[390px] flex-col bg-[#f8faf7] p-4 md:p-6">
                <div role="log" aria-live="polite" aria-label="Community AI conversation" className="flex-1 space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#dcece0] text-[#23845f]"><Bot size={17} /></span>
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-[#e4ece2] bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm">
                      Hi {member.name.split(" ")[0]}! I can help you find community programs, upcoming events, and learning resources. What would you like to explore?
                    </div>
                  </div>
                  {chatMessages.map((chatMessage, index) => (
                    <div key={`${index}-${chatMessage.role}`} className={`flex items-start gap-3 ${chatMessage.role === "user" ? "justify-end" : ""}`}>
                      {chatMessage.role === "assistant" && <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#dcece0] text-[#23845f]"><Bot size={17} /></span>}
                      {chatMessage.role === "assistant" ? (
                        <div className="min-w-0 max-w-[85%] rounded-2xl rounded-tl-sm border border-[#e4ece2] bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm">
                          <ReactMarkdown remarkPlugins={[remarkGfm]} components={chatMarkdownComponents}>{chatMessage.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#176347] px-4 py-3 text-sm leading-6 text-white">{chatMessage.content}</p>
                      )}
                    </div>
                  ))}
                  {chatBusy && (
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#dcece0] text-[#23845f]"><Bot size={17} /></span>
                      <span className="inline-flex items-center gap-2"><LoaderCircle size={15} className="animate-spin" /> Thinking...</span>
                    </div>
                  )}
                </div>

                {chatMessages.length === 0 && !chatBusy && (
                  <div className="mt-6">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Try asking</p>
                    <div className="flex flex-wrap gap-2">
                      {["What events are coming up?", "Show me learning programs", "How can I get involved?"].map((prompt) => (
                        <button key={prompt} type="button" onClick={() => setChatDraft(prompt)} className="rounded-full border border-[#dce4da] bg-white px-3 py-2 text-left text-xs font-medium text-[#35564a] transition hover:border-[#8db49a] hover:bg-[#f1f7f1]">
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <form onSubmit={handleChatSubmit} className="mt-5 flex items-center gap-2 rounded-xl border border-[#dce4da] bg-white p-2 shadow-sm focus-within:border-[#8db49a]">
                  <label htmlFor="community-ai-message" className="sr-only">Message Community AI</label>
                  <input id="community-ai-message" value={chatDraft} onChange={(event) => setChatDraft(event.target.value)} disabled={chatBusy} placeholder="Ask about your community..." className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 disabled:opacity-60" />
                  <button type="submit" disabled={!chatDraft.trim() || chatBusy} aria-label="Send message" className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#176347] text-white transition hover:bg-[#104e39] disabled:cursor-not-allowed disabled:opacity-40"><Send size={17} /></button>
                </form>
                <p className="mt-2 text-center text-xs text-slate-400">Community AI can help with education, festivals, agriculture, sports, and more.</p>
              </div>
            </section>

            <aside>
              <h2 className="mb-4 text-xl font-bold text-[#183a32]">Your profile</h2>
              <div className="border border-[#dce4da] bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e6f0e8] text-[#39745a]"><CircleUserRound size={23} /></span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#183a32]">{member.name}</p>
                    <p className="truncate text-sm text-slate-500">{member.email}</p>
                  </div>
                </div>
                <div className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  <p className="flex items-center gap-2"><Check size={16} className="text-[#23845f]" /> Community member</p>
                  <p className="mt-3 flex items-center gap-2"><CalendarDays size={16} className="text-[#23845f]" /> Events and programs</p>
                  <p className="mt-3 flex items-center gap-2"><BookOpen size={16} className="text-[#23845f]" /> Learning resources</p>
                </div>
              </div>

              <div className="mt-7">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-[#183a32]">Community updates</h2>
                  <span className="text-sm text-slate-500">Latest</span>
                </div>
                <article className="border border-[#dce4da] bg-white p-5">
                  <div className="flex items-center gap-3 text-sm text-[#59806d]">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e6f0e8]"><Users size={17} /></span>
                    Community team <span className="text-slate-400">/</span> Welcome
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#183a32]">Good things grow when we build them together.</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Explore local programs, meet people with shared interests, and keep up with upcoming events.</p>
                  <a href={`/#${getCommunityRoute(location.pathname, "/community")}`} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#177454] hover:underline">Explore the community <ArrowRight size={16} /></a>
                </article>
              </div>
            </aside>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#f5f7f3] px-5 py-10 md:px-8 md:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden border border-[#dce4da] bg-white shadow-[0_24px_70px_rgba(27,59,46,0.09)] md:grid-cols-[0.9fr_1.1fr]">
        <section className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-[#17483b] p-7 text-white md:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/15" />
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/15" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b8d7bd]">ThirupalTech / Apps</p>
            <h1 className="mt-8 max-w-sm text-4xl font-bold leading-tight">A closer connection to your community.</h1>
          </div>
          <p className="relative mt-10 max-w-sm text-sm leading-6 text-white/75">Find opportunities to learn, participate, and grow alongside the people around you.</p>
        </section>

        <section className="p-6 md:p-10">
          <div className="flex border-b border-slate-200" role="tablist" aria-label="Account access">
            <button type="button" role="tab" aria-selected={mode === "register"} onClick={() => { setMode("register"); setMessage(""); }} className={`border-b-2 px-4 py-3 text-sm font-semibold ${mode === "register" ? "border-[#23845f] text-[#176347]" : "border-transparent text-slate-500 hover:text-slate-800"}`}>Register</button>
            <button type="button" role="tab" aria-selected={mode === "login"} onClick={() => { setMode("login"); setMessage(""); }} className={`border-b-2 px-4 py-3 text-sm font-semibold ${mode === "login" ? "border-[#23845f] text-[#176347]" : "border-transparent text-slate-500 hover:text-slate-800"}`}>Login</button>
          </div>

          <div className="pt-7">
            <h2 className="text-2xl font-bold text-[#183a32]">{mode === "register" ? "Join the community" : "Welcome back"}</h2>
            <p className="mt-2 text-sm text-slate-600">{mode === "register" ? "Create your member profile to get started." : "Sign in to continue to your community."}</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {mode === "register" && (
                <label className="block text-sm font-medium text-slate-700">
                  Full name
                  <input required autoComplete="name" minLength={2} value={name} onChange={(event) => setName(event.target.value)} className="mt-1.5 block w-full border border-slate-300 px-3 py-3 outline-none transition focus:border-[#23845f] focus:ring-2 focus:ring-[#23845f]/15" />
                </label>
              )}
              {mode === "register" && (
                <label className="block text-sm font-medium text-slate-700">
                  Phone number
                  <input required type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-1.5 block w-full border border-slate-300 px-3 py-3 outline-none transition focus:border-[#23845f] focus:ring-2 focus:ring-[#23845f]/15" />
                </label>
              )}
              <label className="block text-sm font-medium text-slate-700">
                Email address
                <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 block w-full border border-slate-300 px-3 py-3 outline-none transition focus:border-[#23845f] focus:ring-2 focus:ring-[#23845f]/15" />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Password
                <input required type="password" autoComplete={mode === "register" ? "new-password" : "current-password"} minLength={mode === "register" ? 8 : undefined} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 block w-full border border-slate-300 px-3 py-3 outline-none transition focus:border-[#23845f] focus:ring-2 focus:ring-[#23845f]/15" />
                {mode === "register" && <span className="mt-1 block text-xs text-slate-500">Use at least 8 characters.</span>}
              </label>
              {message && <p role="alert" className="text-sm text-red-700">{message}</p>}
              <button disabled={busy} type="submit" className="flex w-full items-center justify-center gap-2 bg-[#176347] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#104e39] disabled:cursor-wait disabled:opacity-70">
                {busy ? "Please wait..." : mode === "register" ? "Create account" : "Sign in"}
                {!busy && <ArrowRight size={17} />}
              </button>
            </form>
            <p className="mt-5 border-l-2 border-[#23845f] bg-[#edf7ef] px-3 py-2.5 text-xs leading-5 text-[#285445]">Your account details are securely processed by the ThirupalTech account service.</p>
          </div>
        </section>
      </div>
    </main>
  );
}