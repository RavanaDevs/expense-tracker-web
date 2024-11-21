import { NextResponse, NextRequest } from "next/server";
import User from "./models/userModel";
import { verify } from "./lib/customjwt";
import connectToDatabase from "./lib/database";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";


export async function middleware(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = await verify(token, JWT_SECRET);




    // const resposnse = NextResponse.next();

    // resposnse.headers.set("X-User", JSON.stringify(user));
    // return resposnse;
    return NextResponse.next();
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 403 }
    );
  }
}

export const config = {
  matcher: ["/api/users/:path*"],
};
