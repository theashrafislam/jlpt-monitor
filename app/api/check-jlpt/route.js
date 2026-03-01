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
    // Strip HTML tags and scripts/styles
    const stripHTML = html => html
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<style[^>]*>.*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const bodyText = stripHTML(body);
    const summary = bodyText.length > 200 ? bodyText.slice(0, 200) + "..." : bodyText;

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      body: summary
    });
  } catch (err) {
    return NextResponse.json({
      status: 0,
      statusText: "NETWORK ERROR",
      body: null,
    });
  }
}