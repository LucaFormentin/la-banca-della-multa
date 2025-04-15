import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  
  console.log("🚀 ~ GET ~ searchParams:", searchParams)

  // return Response.redirect('http://192.168.1.170:3000', 302)
}
