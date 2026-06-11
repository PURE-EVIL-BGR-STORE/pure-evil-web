import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const profileServiceUrl = process.env.PROFILE_SERVICE_URL;
    const keycloakUrl = process.env.KEYCLOAK_URL;
    const realm = process.env.KEYCLOAK_REALM;
    const clientId = process.env.KEYCLOAK_CLIENT_ID;
    const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;

    if (!profileServiceUrl || !keycloakUrl || !realm || !clientId || !clientSecret) {
      return NextResponse.json({ error: "Auth service not configured" }, { status: 503 });
    }

    const response = await fetch(`${profileServiceUrl}/profile/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const profileData = await response.json();

    if (!response.ok || profileData.code !== 1000) {
      return NextResponse.json(
        { error: profileData.message ?? "Registration failed" },
        { status: response.status || 400 }
      );
    }

    const tokenParams = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "password",
      username: body.username,
      password: body.password,
    });

    const tokenResponse = await fetch(
      `${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: tokenParams.toString(),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { error: "Registration succeeded, but auto-login failed." },
        { status: tokenResponse.status || 400 }
      );
    }

    const res = NextResponse.json({ success: true, data: profileData.result }, { status: 200 });

    res.cookies.set({
      name: "auth_session",
      value: tokenData.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokenData.expires_in ?? 3600,
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
