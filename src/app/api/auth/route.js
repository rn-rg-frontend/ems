import { comparePassword, generateToken } from "../../../lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { userName, password } = body;

    if (!userName || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400 }
      );
    }

    const user = await prisma.userProfile.findUnique({ where: { userName } });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    const token = generateToken(user);

    return new Response(
      JSON.stringify({
        token,
        user: { id: user.id, email: user.email, isAdmin: user.isAdmin },
      }),
      {
        status: 200, 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
