/**
 * Thin fetch wrapper for the app's JSON API routes. Throws on non-2xx so
 * react-query surfaces the error state, and returns the parsed JSON body.
 */
export async function apiRequest<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (body?.error && typeof body.error === 'string') {
        message = body.error;
      }
    } catch {
      // response had no JSON body — keep the default message
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
