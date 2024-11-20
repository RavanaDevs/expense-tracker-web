import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database";
import User from "@/models/userModel";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const users = await User.find();
    console.log(users);
    return NextResponse.json({ users });
  } catch (err) {
    console.log("Error while getting users.\n", err);
    NextResponse.json({ error: "error occured while getting users" });
  }
}
