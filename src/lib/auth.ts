import { setCookie, destroyCookie, parseCookies } from "nookies";

export const AUTH_TOKEN_KEY = "token";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Use cookies for auth check
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const cookies = parseCookies();
  return !!cookies[AUTH_TOKEN_KEY];
}

//  Store in cookie for SSR and client-side access
export function login(email: string, password: string): boolean {
  if (!isValidEmail(email) || password.trim().length === 0) {
    return false;
  }

  const token = btoa(`${email}:${password}`);
  setCookie(null, AUTH_TOKEN_KEY, token, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  return true;
}

//  Remove token from cookies
export function logout() {
  destroyCookie(null, AUTH_TOKEN_KEY);
}
