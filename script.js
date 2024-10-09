let score = 0;
let moleTimeout;
let gameRunning = false;
let moleSpeed = 2000; // 初始速度 1秒
let gameDuration = 10000; // 遊戲持續時間 10秒
let decreaseInterval = 50; // 每次減少的時間間隔
let badMoleChance = 0.3; // 有 30% 的機率地鼠不能點擊

function randomHole() {
  const holes = document.querySelectorAll(".hole");
  const index = Math.floor(Math.random() * holes.length);
  return holes[index];
}

function showMole() {
  if (!gameRunning) return;

  const hole = randomHole();
  const mole = document.createElement("img");
  mole.src = "mole.png"; // 地鼠圖片
  mole.classList.add("mole");

  // 判斷是否是「不能點」的地鼠
  const isBadMole = Math.random() < badMoleChance;

  if (isBadMole) {
    mole.src = "bad-mole.png"; // 「不能點」地鼠的圖片
    mole.classList.add("bad-mole");
    mole.addEventListener("click", () => {
      score--; // 點擊「不能點」地鼠會扣分
      document.getElementById("score").textContent = score;
      mole.remove();
    });
  } else {
    mole.addEventListener("click", () => {
      score++; // 點擊正常地鼠會加分
      document.getElementById("score").textContent = score;
      mole.remove();
    });
  }

  hole.appendChild(mole);

  moleTimeout = setTimeout(() => {
    mole.remove();
    if (gameRunning) {
      showMole();
    }
  }, moleSpeed); // 根據目前的速度顯示地鼠

  // 逐漸加快地鼠的出現速度
  moleSpeed = Math.max(200, moleSpeed - decreaseInterval); // 最快每200毫秒出現一隻
}

function startGame() {
  score = 0;
  moleSpeed = 1000; // 重置速度
  document.getElementById("score").textContent = score;
  gameRunning = true;
  showMole();

  setTimeout(() => {
    gameRunning = false;
    clearTimeout(moleTimeout);
    alert(`遊戲結束！你的分數是 ${score}`);
  }, gameDuration); // 遊戲持續 10 秒
}
