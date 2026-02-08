import { NextResponse } from "next/server";

export async function POST(req: Request) { 
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { username, password } = (body ?? {}) as {
    username?: string;
    password?: string;
  };

  if (!username?.trim() || !password?.trim()) {
    return NextResponse.json(
      { message: "Username and password are required" },
      { status: 400 }
    );
  }
 
  const upstreamUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`;

  const res = await fetch(upstreamUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify({ username, password }),
    cache: "no-store",
  });

  console.log("Login upstream status:", res.status);
 
  if (!res.ok) {
    const text = await res.text().catch(() => ""); 
    return NextResponse.json(
      { message: text || `Login failed (${res.status})` },
      { status: res.status }
    );
  }
 
  const data = (await res.json()) as { token?: string };

  if (!data?.token) {
    return NextResponse.json(
      { message: "Login succeeded but no token returned" },
      { status: 502 }
    );
  }

  const response = NextResponse.json({ token: data.token });  

  response.cookies.set("auth_token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
