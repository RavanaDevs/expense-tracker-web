"use server";

import { NextResponse, NextRequest } from "next/server";
import User from "./models/userModel";
import { JwtPayload, verify } from "./lib/customjwt";
import { connectToDatabase } from "./lib/database";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function middleware(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("decoding");

    const decoded = (await verify(token, JWT_SECRET)) as JwtPayload;
    console.log(decoded.userId);
    await connectToDatabase();
    const user = await User.findById(decoded.userId).select("-password");

    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // const resposnse = NextResponse.next();
    return NextResponse.next();
    // resposnse.headers.set("X-User", JSON.stringify(user));
    // return resposnse;
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 403 }
    );
  }
}

export const config = {
  matcher: ["/api/users/:path*"],
};
