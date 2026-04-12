function submitData() {
  const input = document.getElementById("userInput").value;

  if (!input) {
    alert("入力してください");
    return;
  }

  // 仮：そのまま表示（後でWorkerに送る）
  document.getElementById("result").innerText =
    "あなたの入力:\n" + input;
}