import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://jlpt.juaab-bd.org/jlpt_test_level",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );

    const html = await response.text();


    const body = html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/<\/?[^>]+(>|$)/g, "") // remove all tags
      .replace(/\s+/g, " ") // multiple spaces → single
      .trim();

    // truncate first 500 char
    const shortBody = body.length > 500 ? body.slice(0, 500) + "..." : body;

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      body: shortBody,
    });
  } catch (err) {
    return NextResponse.json(
      { status: 500, statusText: "Network Error", body: "" },
      { status: 500 }
    );
  }
}