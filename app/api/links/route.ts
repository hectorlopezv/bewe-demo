import { BASE_URL } from "@/lib/utils";
import { SignInValidator } from "@/validators/sign-in-validator";
import axios from "axios";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = SignInValidator.parse(body);
    const res = await axios.post(`${BASE_URL}auth/login`, { email, password });
    console.log("res", res.data);
    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Invalid input", { status: 400 });
    }
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = SignInValidator.parse(body);
    const res = await axios.post(`${BASE_URL}auth/login`, { email, password });
    console.log("res", res.data);
    return NextResponse.json(res.data);
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Invalid input", { status: 400 });
    }
  }
}
