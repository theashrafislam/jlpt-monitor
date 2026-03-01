import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Browser এর মতো request headers ব্যবহার
    const response = await fetch("https://jlpt.juaab-bd.org/jlpt_test_level", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    const body = await response.text(); // Full HTML / page content

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      body, // terminal-এ দেখানোর জন্য
    });
  } catch (err) {
    return NextResponse.json({
      status: 0,
      statusText: "NETWORK ERROR",
      body: null,
    });
  }
}