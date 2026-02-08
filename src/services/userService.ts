import { RegisterUserRequest, RegisterUserResponse } from "@/types/user";
import { safeJson } from "@/utils/safeJson";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`;

export async function registerUser(
  payload: RegisterUserRequest
): Promise<RegisterUserResponse> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 0,  
      ...payload,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Registration failed (${res.status})`);
  }

  return safeJson<RegisterUserResponse>(res);
}
