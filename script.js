async function send() {
  const input = document.getElementById("input").value;

  const res = await fetch("https://fancy-salad-35ac.kanachenliebe.workers.dev
", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ input })
  });

  const data = await res.json();

  document.getElementById("output").innerText = data.output;
}
