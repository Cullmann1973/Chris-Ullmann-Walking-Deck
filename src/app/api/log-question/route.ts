export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { question, timestamp } = await req.json();

    if (!question || typeof question !== "string") {
      return new Response(JSON.stringify({ error: "Invalid question" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Log to Vercel function logs (visible in Vercel dashboard → Logs)
    console.log(
      JSON.stringify({
        type: "UNANSWERED_QUESTION",
        question: question.slice(0, 500),
        timestamp: timestamp || new Date().toISOString(),
      })
    );

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to log" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
