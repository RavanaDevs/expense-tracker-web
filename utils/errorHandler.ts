import { NextResponse } from "next/server";

export function withErrorHandler(handler: Function) {
  return async (req: any, ...args: any[]) => {
    try {
      return await handler(req, ...args);
    } catch (error) {
      console.error("API Error:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
