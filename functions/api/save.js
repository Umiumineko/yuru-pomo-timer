export async function onRequest(context) {
  const { request, env } = context;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method === "POST") {
    const data = await request.json();

    let current = await env.STUDY_LOG.get("total");
    current = current ? Number(current) : 0;

    let newTotal = current + data.seconds;

    await env.STUDY_LOG.put("total", String(newTotal));

    return new Response(JSON.stringify({ success: true }), {
      headers: { 
        "Content-Type": "application/json",
        ...corsHeaders
      }
    });
  }

  return new Response("ok", { headers: corsHeaders });
}
