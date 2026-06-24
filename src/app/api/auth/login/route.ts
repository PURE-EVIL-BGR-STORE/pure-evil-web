import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const keycloakUrl = process.env.KEYCLOAK_URL;
    const realm = process.env.KEYCLOAK_REALM;
    const clientId = process.env.KEYCLOAK_CLIENT_ID;
    const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;

    if (!keycloakUrl || !realm || !clientId || !clientSecret) {
      return NextResponse.json({ error: "Auth service not configured" }, { status: 503 });
    }

    const tokenParams = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "password",
      username: body.identifier,
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

    const responseText = await tokenResponse.text();
    let tokenData: any;
    try {
      tokenData = JSON.parse(responseText);
    } catch (e: any) {
      console.error("Keycloak raw response:", responseText);
      return NextResponse.json(
        { error: "Keycloak returned non-JSON response", raw: responseText },
        { status: 502 }
      );
    }

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { error: tokenData.error_description ?? "Invalid credentials" },
        { status: tokenResponse.status || 401 }
      );
    }

    const res = NextResponse.json({ success: true }, { status: 200 });

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
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: error?.message ?? "Internal server error", stack: error?.stack }, { status: 500 });
  }
}
