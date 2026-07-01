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

    const keycloakUrl = process.env.KEYCLOAK_URL;
    const realm = process.env.KEYCLOAK_REALM;
    const clientId = process.env.KEYCLOAK_CLIENT_ID;
    const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET;

    if (refreshToken && keycloakUrl && realm && clientId && clientSecret) {
      const logoutParams = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
      });

      try {
        await fetch(
          `${keycloakUrl}/realms/${realm}/protocol/openid-connect/logout`,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: logoutParams.toString(),
          }
        );
      } catch (err) {
        console.error("Failed to notify Keycloak of logout:", err);
      }
    }

    const response = new NextResponse(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

    response.cookies.set({
      name: "auth_session",
      value: "",
      maxAge: 0,
      path: "/",
    });
    response.cookies.set({
      name: "auth_refresh",
      value: "",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Logout Error:", error);
    return new NextResponse(
      JSON.stringify({ error: error?.message ?? "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}
