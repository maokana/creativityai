const WORKER_URL = "https://fancy-salad-35ac.kanachenliebe.workers.dev";

let task = "";
let condition = "";
let phase = 0;

let timeLeft = 300;

let hintText = "";
let sessionId = "";

// =========================
// ■ 開始
// =========================
async function startTest() {

  try {
    const res = await fetch(`${WORKER_URL}/tasks`);
    const data = await res.json();

    task = data.task;
    condition = data.condition;

    document.getElementById("task").innerText = task;
    document.getElementById("condition").innerText = condition;

  } catch (e) {
    console.error(e);
    document.getElementById("task").innerText = "読み込みエラー";
  }

  startTimer();
}

// =========================
// ■ タイマー
// =========================
function startTimer() {

  setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
  }, 1000);
}

// =========================
// ■ 送信
// =========================
async function submitAnswer() {

  const input = document.getElementById("input").value;
  if (!input) return;

  // -------------------------
  // 初回：ヒント取得
  // -------------------------
  if (phase === 0) {

    const res = await fetch(`${WORKER_URL}/hint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input,
        task,
        condition
      })
    });

    const data = await res.json();

    hintText = data.hint;
    sessionId = data.sessionId;

    document.getElementById("hint").innerText = hintText;

    phase = 1;
    return;
  }

  // -------------------------
  // 最終回答：UPDATE
  // -------------------------
  if (phase === 1) {

    const finalAnswer = input;

    document.getElementById("final").innerText = finalAnswer;

    await fetch(`${WORKER_URL}/final`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        finalAnswer,
        sessionId
      })
    });

    phase = 2;
  }
}

// 自動開始
startTest();
