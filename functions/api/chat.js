export async function onRequestPost({ request, env }) {

  const { input } = await request.json();

  const prompt = `
あなたは創造性支援AIです。
以下の課題に対して3つのアイデアを出してください。

課題：
${input}

条件：
- 独創的に
- 実現可能性も考慮
`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await res.json();

  return new Response(JSON.stringify({
    output: data.choices[0].message.content
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
