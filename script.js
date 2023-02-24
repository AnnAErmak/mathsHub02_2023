const getRandomNumRange = (min, max) => {
  const randomNum = (Math.random() * (max - min) + min).toFixed(0);
  return randomNum;
};
const getTask = () => {
  const symbol = Math.random() > 0.5 ? "+" : "-";
  const task = `${getRandomNumRange(0, 100)} ${symbol} ${getRandomNumRange(
    0,
    100
  )}`;
  gameState.rightAnswer = eval(task);
  return task;
};

const gameElements = document.getElementById("my_game").children;
const title = gameElements[0];
const userTask = gameElements[1];
const userAnswer = gameElements[2];
const btnGame = gameElements[3];

const gameState = {
  taskInProcess: false,
  rightAnswer: null,
};
btnGame.onclick = () => {
  if (!gameState.taskInProcess) {
    title.innerText = "Игра началась!";
    userAnswer.value = null;
    userTask.innerText = getTask();
    userAnswer.hidden = false;
    btnGame.innerText = "Проверить";
    gameState.taskInProcess = true;
  } else {
    const isRight = gameState.rightAnswer == userAnswer.value;
    userTask.innerText = userTask.innerText + "=" + gameState.rightAnswer;
    title.innerText = isRight ? "Вы победили!" : "Вы проиграли!";
    btnGame.innerText = "Начать заного!";
    gameState.taskInProcess = false;
  }
};

const choosedEl = document.querySelectorAll(".choosed_block-container > div");
const counterEl = document.querySelector(".choosed_block span");

const choosedState = {
  countElements: 0,
};
const changeCount = (value) => {
  choosedState.countElements += value;
  counterEl.innerText = choosedState.countElements;
};
for (let i = 0; i < choosedEl.length; i++) {
  choosedEl[i].addEventListener("click", (e) => {
    if (e.target.className === "") {
      e.target.className = "choosed_element";
      changeCount(1);
    } else {
      e.target.className = "";
      changeCount(-1);
    }
  });
}
