export async function safeJson<T>(res: Response): Promise<T> {
  const text = await res.text();

  if (!text) {
    throw new Error(`Empty response body (${res.status})`);
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      `Invalid JSON response (${res.status}). First 120 chars: ${text.slice(0, 120)}`
    );
  }
}
