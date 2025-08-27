import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import { User } from "@/schemas/text.modal";
import { generateAlphanumeric } from "@/lib/generateAlphanumeric";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    let id = "";
    let exists = true;
    while (exists) {
      id = generateAlphanumeric(6);
      const doc = await User.exists({ id });
      exists = !!doc;
    }

    const ip = req.headers.get("x-forwarded-for") || "unknown";

    const newText = await User.create({
      text,
      id,
      accessCount: 0,
      ip,
    });

    const baseUrl = req.nextUrl.origin;

    return NextResponse.json(
      {
        message: "Text saved successfully",
        id: newText.id,
        url: `${baseUrl}/${newText.id}`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error saving text:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
