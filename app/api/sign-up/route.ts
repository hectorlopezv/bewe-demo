import { BASE_URL } from "@/lib/utils";
import { SignUpValidator } from "@/validators/sign-up-validator";
import axios from "axios";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, fullName } = SignUpValidator.parse(body);
    const res = await axios.post(`${BASE_URL}auth/singin`, {
      email,
      password,
      name: fullName,
    });
    console.log("res", res.data);
    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Invalid input", { status: 400 });
    }
    console.log("[SIGNUP_POST]", error);
  }
}
