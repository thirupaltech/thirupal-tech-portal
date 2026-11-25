export type CommunityMember = {
  name: string;
  email: string;
  phone?: string;
};

type AuthResponse = {
  token?: string;
  accessToken?: string;
  message?: string;
  user?: Record<string, unknown>;
  data?: AuthResponse & Record<string, unknown>;
  [key: string]: unknown;
};

type AuthResult = {
  member: CommunityMember;
  token?: string;
  message?: string;
};

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8081").replace(/\/$/, "");

function getMember(response: AuthResponse, fallback: CommunityMember): CommunityMember {
  const data = response.data && typeof response.data === "object" ? response.data : undefined;
  const user = response.user ?? data?.user ?? data;

  if (!user || typeof user !== "object") return fallback;

  const name = user.fullName ?? user.name ?? user.username;
  const email = user.email;
  const phone = user.phone;

  return {
    name: typeof name === "string" ? name : fallback.name,
    email: typeof email === "string" ? email : fallback.email,
    phone: typeof phone === "string" ? phone : fallback.phone,
  };
}

async function postAuth(path: string, payload: Record<string, string>, fallbackMember: CommunityMember): Promise<AuthResult> {
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}/api/users/${path}`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Unable to reach the account service. Check that the backend is running on port 8081.");
  }

  const rawBody = await response.text();
  let result: AuthResponse = {};
  if (rawBody) {
    try {
      result = JSON.parse(rawBody) as AuthResponse;
    } catch {
      result = { message: rawBody };
    }
  }

  if (!response.ok) {
    const errorMessage = result.message ?? result.error ?? result.detail;
    throw new Error(typeof errorMessage === "string" ? errorMessage : `Request failed (${response.status}). Please try again.`);
  }

  const token = result.token ?? result.accessToken ?? result.data?.token ?? result.data?.accessToken;
  return {
    member: getMember(result, fallbackMember),
    token: typeof token === "string" ? token : undefined,
    message: typeof result.message === "string" ? result.message : undefined,
  };
}

export function registerUser(input: CommunityMember & { password: string }) {
  return postAuth("register", {
    fullName: input.name,
    email: input.email,
    phone: input.phone ?? "",
    password: input.password,
  }, input);
}

export function loginUser(input: Pick<CommunityMember, "email"> & { password: string }) {
  return postAuth("login", {
    email: input.email,
    password: input.password,
  }, { name: input.email, email: input.email });
}