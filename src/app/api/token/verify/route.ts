import { validateJWTToken } from "@/lib/token";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    const result = await validateJWTToken(token);
    return NextResponse.json({ data: result, message: "success", error: null });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
