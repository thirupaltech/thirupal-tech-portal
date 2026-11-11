import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, BookOpen, CalendarDays, Check, CircleUserRound, LogOut, Users } from "lucide-react";
import { getCommunityRoute } from "../utils/communityRoutes";
import { useLocation } from "react-router-dom";

type CommunityAccount = {
  name: string;
  email: string;
  salt: string;
  passwordHash: string;
};

type CommunityMember = Pick<CommunityAccount, "name" | "email">;

const accountsKey = "thirupal-community-accounts";
const sessionKey = "thirupal-community-member";

function readAccounts(): CommunityAccount[] {
  try {
    return JSON.parse(localStorage.getItem(accountsKey) ?? "[]") as CommunityAccount[];
  } catch {
    return [];
  }
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password: string, salt: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: Uint8Array.from(salt.match(/.{2}/g) ?? [], (byte) => parseInt(byte, 16)), iterations: 120000, hash: "SHA-256" },
    key,
    256
  );
  return bytesToHex(new Uint8Array(bits));
}

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
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setBusy(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const accounts = readAccounts();
      let signedInMember: CommunityMember | undefined;

      if (mode === "register") {
        if (accounts.some((account) => account.email === normalizedEmail)) {
          setMessage("An account with this email already exists. Sign in instead.");
          return;
        }

        const salt = bytesToHex(crypto.getRandomValues(new Uint8Array(16)));
        const account = {
          name: name.trim(),
          email: normalizedEmail,
          salt,
          passwordHash: await hashPassword(password, salt),
        };
        localStorage.setItem(accountsKey, JSON.stringify([...accounts, account]));
        signedInMember = { name: account.name, email: account.email };
      } else {
        const account = accounts.find((item) => item.email === normalizedEmail);
        if (!account || await hashPassword(password, account.salt) !== account.passwordHash) {
          setMessage("We couldn't sign you in with those details.");
          return;
        }
        signedInMember = { name: account.name, email: account.email };
      }

      sessionStorage.setItem(sessionKey, JSON.stringify(signedInMember));
      setMember(signedInMember);
      setPassword("");
    } catch {
      setMessage("Account storage is unavailable in this browser. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function signOut() {
    sessionStorage.removeItem(sessionKey);
    setMember(null);
    setMode("login");
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

          <section className="grid gap-8 py-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#183a32]">Community updates</h2>
                <span className="text-sm text-slate-500">Latest</span>
              </div>
              <article className="border border-[#dce4da] bg-white p-6 md:p-8">
                <div className="flex items-center gap-3 text-sm text-[#59806d]">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e6f0e8]"><Users size={17} /></span>
                  Community team <span className="text-slate-400">/</span> Welcome
                </div>
                <h3 className="mt-5 text-2xl font-bold text-[#183a32]">Good things grow when we build them together.</h3>
                <p className="mt-3 max-w-2xl leading-7 text-slate-600">Your community space is ready. Explore local programs, meet people with shared interests, and keep up with upcoming events.</p>
                <a href={`/#${getCommunityRoute(location.pathname, "/community")}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#177454] hover:underline">Explore the community <ArrowRight size={16} /></a>
              </article>
            </div>
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
            <p className="mt-5 border-l-2 border-amber-500 bg-amber-50 px-3 py-2.5 text-xs leading-5 text-amber-950">Preview account flow: profile data is stored in this browser only. Connect a backend before using real member accounts.</p>
          </div>
        </section>
      </div>
    </main>
  );
}