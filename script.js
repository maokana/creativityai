async function submitData() {
  const input = document.getElementById("userInput").value;

  // 入力チェック
  if (!input) {
    document.getElementById("result").innerText = "入力してください";
    return;
  }

  try {
    const res = await fetch("https://fancy-salad-35ac.kanachenliebe.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input })
    });

    const data = await res.json();

    // ★エラー処理（重要）
    if (!res.ok) {
      document.getElementById("result").innerText =
        "エラー: " + (data.error || "サーバーエラー");
      return;
    }

    // 成功時
    document.getElementById("result").innerText = data.output;

  } catch (err) {
    document.getElementById("result").innerText =
      "通信エラー: " + err.message;
  }
}
