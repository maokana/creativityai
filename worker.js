export default {
  async fetch(request, env) {

    if (request.method !== "POST") {
      return new Response("POST only");
    }

    const { input } = await request.json();

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: input }
        ]
      })
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({
        error: data.error?.message || "OpenAIエラー"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    return new Response(JSON.stringify({
      output: data.choices[0].message.content
    }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};