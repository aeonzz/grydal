import { pexelsClient } from "@/lib/pexels-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "black";

  try {
    const response = await pexelsClient.photos.search({
      query: search,
      page: page,
      per_page: 30,
    });

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong! try again later" },
      { status: 500 }
    );
  }
}
