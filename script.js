const WORKER_URL = "https://fancy-salad-35ac.kanachenliebe.workers.dev";

let task = "";
let condition = "";
let phase = 0;

let timeLeft = 300;

let initialAnswer = "";
let finalAnswer = "";
let hintText = "";

// =========================
// ■ 実験開始
// =========================
async function startTest() {

  try {
    const res = await fetch(`${WORKER_URL}/tasks`);

    if (!res.ok) {
      throw new Error("tasks取得失敗");
    }

    const data = await res.json();

    task = data.task;
    condition = data.condition;

    document.getElementById("task").innerText = task;
    document.getElementById("condition").innerText = condition;

  } catch (err) {
    document.getElementById("task").innerText = "読み込みエラー";
    console.error("tasks error:", err);
  }

  startTimer();
}

// =========================
// ■ タイマー
// =========================
function startTimer() {

  const timer = setInterval(() => {

    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endTest();
    }

  }, 1000);
}

// =========================
// ■ 終了画面
// =========================
function endTest() {
  document.body.innerHTML = "<h1>テスト終了です</h1>";
}

// =========================
// ■ 回答送信
// =========================
async function submitAnswer() {

  const input = document.getElementById("input").value;
  if (!input) return;

  // 初回 → ヒント取得
  if (phase === 0) {

    initialAnswer = input;

    try {
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

      if (!res.ok) {
        throw new Error(data.error || "hint取得失敗");
      }

      hintText = data.hint;

      document.getElementById("hint").innerText = hintText;

      phase = 1;

    } catch (err) {
      console.error("hint error:", err);
      document.getElementById("hint").innerText = "ヒント取得エラー";
    }

    return;
  }

  // 最終回答
  if (phase === 1) {
    finalAnswer = input;
    document.getElementById("final").innerText = finalAnswer;
    phase = 2;
  }
}

// 自動開始
startTest();
