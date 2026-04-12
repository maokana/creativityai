async function submitData() {
  console.log("クリックされた");

  const input = document.getElementById("userInput").value;

  if (!input) {
    alert("入力してください");
    return;
  }

  try {
    const res = await fetch("https://wispy-poetry-3a5b.kanachenliebe.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input })
    });

    console.log("ステータス:", res.status);

    // エラー時の処理
    if (!res.ok) {
      const text = await res.text();
      console.error("サーバーエラー:", text);
      document.getElementById("result").innerText = "サーバーエラー：" + text;
      return;
    }

    const data = await res.json();
    console.log("データ:", data);

    document.getElementById("result").innerText = data.output;

  } catch (e) {
    console.error("通信エラー:", e);
    document.getElementById("result").innerText = "通信エラーが発生しました";
  }
}
