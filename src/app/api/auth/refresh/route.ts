import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
    "Access-Control-Allow-Credentials": "true",
  };
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(req),
  });
}

export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders(req);

  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("auth_refresh")?.value;

    if (!refreshToken) {
      return new NextResponse(
        JSON.stringify({ error: "No refresh token available" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const keycloakUrl = process.env.KEYCLOAK_URL;
    const realm = process.env.KEYCLOAK_REALM;
    const clientId = process.env.KEYCLOAK_CLIENT_ID;
    const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;

    if (!keycloakUrl || !realm || !clientId || !clientSecret) {
      return new NextResponse(
        JSON.stringify({ error: "Auth service not configured" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const tokenParams = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
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
    } catch {
      console.error("Keycloak refresh raw response:", responseText);
      return new NextResponse(
        JSON.stringify({ error: "Keycloak returned non-JSON response" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!tokenResponse.ok) {
      const errorRes = new NextResponse(
        JSON.stringify({ error: tokenData.error_description ?? "Session expired. Please login again." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
      errorRes.cookies.delete("auth_session");
      errorRes.cookies.delete("auth_refresh");
      return errorRes;
    }

    const res = new NextResponse(
      JSON.stringify({
        success: true,
        accessToken: tokenData.access_token,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

    // Set new cookies
    res.cookies.set({
      name: "auth_session",
      value: tokenData.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokenData.expires_in ?? 3600,
      path: "/",
    });

    if (tokenData.refresh_token) {
      res.cookies.set({
        name: "auth_refresh",
        value: tokenData.refresh_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: tokenData.refresh_expires_in ?? 2592000,
        path: "/",
      });
    }

    return res;
  } catch (error: any) {
    console.error("Refresh Token Error:", error);
    return new NextResponse(
      JSON.stringify({ error: error?.message ?? "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}
