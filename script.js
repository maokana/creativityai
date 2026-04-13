const WORKER_URL = "https://fancy-salad-35ac.kanachenliebe.workers.dev";

let task = "";
let condition = "";
let phase = 0;

let timeLeft = 300;

let initialAnswer = "";
let finalAnswer = "";
let hintText = "";
let userId = "";

// =========================
async function startTest() {

  try {
    const res = await fetch(`${WORKER_URL}/tasks`);
    const data = await res.json();

    task = data.task;
    condition = data.condition;

    document.getElementById("task").innerText = task;
    document.getElementById("condition").innerText = condition;

  } catch (err) {
    document.getElementById("task").innerText = "読み込みエラー";
    console.error(err);
  }

  startTimer();
}

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
function endTest() {
  document.body.innerHTML = "<h1>テスト終了です</h1>";
}

// =========================
async function submitAnswer() {

  const input = document.getElementById("input").value;
  if (!input) return;

  // 初回 → ヒント取得
  if (phase === 0) {

    initialAnswer = input;

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
    userId = data.user_id;

    document.getElementById("hint").innerText = hintText;

    phase = 1;
    return;
  }

  // 最終回答 → DB更新
  if (phase === 1) {

    finalAnswer = input;

    document.getElementById("final").innerText = finalAnswer;

    await fetch(`${WORKER_URL}/final`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        finalAnswer,
        userId
      })
    });

    phase = 2;
  }
}

// 自動開始
startTest();
