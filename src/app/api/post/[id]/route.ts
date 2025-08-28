import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import { User, type UserDoc } from "@/schemas/text.modal";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { password } = (body ?? {}) as { password?: unknown };
    const passwordString = typeof password === "string" ? password : undefined;

    const text = await User.findOne({ id }).lean<UserDoc | null>();
    if (!text) {
      return NextResponse.json(
        {
          success: false,
          message: "The given id doesn't exist or it is expired.",
        },
        { status: 404 }
      );
    }

    if (!text.isPublic) {
      if (!passwordString || text.password !== passwordString) {
        return NextResponse.json(
          {
            success: false,
            message: "Password is required or incorrect.",
          },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          text: text.text,
          isPublic: text.isPublic,
          id: text.id,
          accessCount: text.accessCount,
          ip: text.ip,
          createdAt: text.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "There was some error with the server",
      },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const text = await User.findOne({ id }).lean<UserDoc | null>();
    if (!text) {
      return NextResponse.json(
        {
          success: false,
          message: "The given id doesn't exist or it is expired.",
        },
        { status: 404 }
      );
    }

    if (!text.isPublic) {
      return NextResponse.json(
        {
          success: false,
          data: {
            isPublic: text.isPublic,
          },
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: text,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "There was some error with the server",
      },
      { status: 500 }
    );
  }
}
