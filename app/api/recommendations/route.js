import { generateRecommendations } from "@/app/lib/recommendation";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId)
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  try {
    const recs = await generateRecommendations(userId);
    return NextResponse.json(recs);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
