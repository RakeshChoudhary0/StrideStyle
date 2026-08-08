import { SignJWT, jwtVerify } from "jose";

const ACCESS_SECRET = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
const REFRESH_SECRET = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET,
);

export async function signAccessToken(payload: {
  userId: string;
  email: string;
}) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .setIssuedAt(Date.now())
    .sign(ACCESS_SECRET);
}

export async function signRefreshToken(payload: {
  userId: string;
  email: string;
}) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt(Date.now())
    .sign(REFRESH_SECRET);
}

// ===========================================
// VERIFYING ACCESS TOKEN
// ===========================================

export async function verifyAccessToken(token: string) {
  try {
    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, ACCESS_SECRET);
    return payload;
    // eslint-disable-next-line
  } catch (error: any) {
    return null;
  }
}

// ===========================================
// VERIFYING REFRESH TOKEN
// ===========================================

export async function verifyRefreshToken(token: string) {
  try {
    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, REFRESH_SECRET);
    return payload;
    // eslint-disable-next-line
  } catch (error: any) {
    return null;
  }
}
