import { createClient, SupabaseClientOptions } from "@supabase/supabase-js";
import { UserFromToken } from "@propelauth/nextjs/client";
import jwt from "jsonwebtoken";

export const getSupabaseClient = async (user: UserFromToken) => {
  const jwtPayload = {
    sub: user.userId,
    email: user.email,
    iss: "supabase",
    aud: "authenticated",
    role: "authenticated",
  };

  const supabaseAccessToken = jwt.sign(
    jwtPayload,
    process.env.SUPABASE_JWT_SECRET ||
      (() => {
        throw new Error("SUPABASE_JWT_SECRET is not defined");
      })(),
    {
      expiresIn: "15 minutes",
    }
  );

  const options: SupabaseClientOptions<any> = {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
    auth: {
      persistSession: false,
    },
  };

  return createClient(
    process.env.SUPABASE_URL ||
      (() => {
        throw new Error("SUPABASE_URL is not defined");
      })(),
    process.env.SUPABASE_API_KEY ||
      (() => {
        throw new Error("SUPABASE_API_KEY is not defined");
      })(),
    options
  );
};
