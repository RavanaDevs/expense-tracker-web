// import { NextResponse, NextRequest } from "next/server";
// import jwt from "jsonwebtoken";
// import User from "./models/userModel";

// const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// interface JwtPayload {
//   userId: string;
// }

// export async function middleware(req: NextRequest) {
//   const token = req.headers.get("Authorization")?.split(" ")[1];

//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const resposnse = NextResponse.next();

//     resposnse.headers.set("X-User", JSON.stringify(user));
//     return resposnse;
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 403 }
//     );
//   }
// }

// export const config = {
//   matcher: ["/api/:path*"],
// };
