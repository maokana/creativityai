async function submitData() {
  const input = document.getElementById("userInput").value;

  if (!input) {
    alert("入力してください");
    return;
  }

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ input })
  });

  const data = await res.json();

  document.getElementById("result").innerText = data.output;
}