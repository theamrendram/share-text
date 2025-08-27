import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import { User } from "@/schemas/text.modal";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;
    console.log("id", id);

    const text = await User.findOne({ id });
    if (!text) {
      return NextResponse.json(
        {
          success: false,
          message: "The given id doesn't exist or it is expired.",
        },
        { status: 404 }
      );
    }

    console.log(text);
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
