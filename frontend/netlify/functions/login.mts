import type { Config } from "@netlify/functions";

export default async (req: Request) => {
  const { email, password } = await req.json().catch(() => ({}));

  // Same admin credentials the original Express backend checked
  if (email === "admin@gmail.com" && password === "123456") {
    return Response.json({
      success: true,
      message: "Login successful",
      token: "fake-jwt-token-xyz",
    });
  }

  return Response.json(
    { success: false, message: "Invalid email or password" },
    { status: 400 }
  );
};

export const config: Config = {
  path: "/api/login",
  method: "POST",
};
