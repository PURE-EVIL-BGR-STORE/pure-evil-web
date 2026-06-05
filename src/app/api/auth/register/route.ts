import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const profileServiceUrl = process.env.PROFILE_SERVICE_URL || "http://localhost:9001";
    const response = await fetch(`${profileServiceUrl}/profile/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const profileData = await response.json();

    if (!response.ok || profileData.code !== 1000) {
      return NextResponse.json(
        { error: profileData.message || "Registration failed" },
        { status: response.status || 400 }
      );
    }

    // If registration is successful, we exchange the user's credentials for a Keycloak token.
    const keycloakUrl = process.env.KEYCLOAK_URL || "http://localhost:8180";
    const realm = process.env.KEYCLOAK_REALM || "pure%20evil%20store";
    const clientId = process.env.KEYCLOAK_CLIENT_ID || "pureevil_store_app";
    const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET || "huABhSlFL2k6bx0UGD3Y800mhZd44qRV";

    const tokenParams = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "password",
      username: body.username,
      password: body.password,
    });

    const tokenResponse = await fetch(`${keycloakUrl}/realms/${realm}/protocol/openid-connect/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenParams.toString(),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { error: "Registration succeeded, but auto-login failed." },
        { status: tokenResponse.status || 400 }
      );
    }

    // Set the HttpOnly session cookie
    const res = NextResponse.json({ success: true, data: profileData.result }, { status: 200 });

    // Calculate expiration based on expires_in returned by Keycloak (usually in seconds)
    const expiresIn = tokenData.expires_in || 3600;

    res.cookies.set({
      name: "auth_session",
      value: tokenData.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expiresIn,
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
