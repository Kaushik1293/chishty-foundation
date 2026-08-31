import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, targetLanguage = "ar", sourceLanguage = "en" } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text to translate is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GOOGLE_TRANSLATE_API_KEY is not configured on the server. Falling back to client-side Google Translation.",
        },
        { status: 503 }
      );
    }

    // Google Cloud Translation API v2
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
        source: sourceLanguage,
        format: "text",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error?.message || "Translation API request failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const translatedText = data.data?.translations?.[0]?.translatedText || text;

    return NextResponse.json({ translatedText, targetLanguage });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error during translation" },
      { status: 500 }
    );
  }
}
