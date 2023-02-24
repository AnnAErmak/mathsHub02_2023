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
const startGameFunc = () => {
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
btnGame.addEventListener("click", startGameFunc);
userAnswer.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    startGameFunc();
  } else if (e.key === "Escape") {
    userAnswer.blur();
  }
});

const choosedEl = document.querySelectorAll(".choosed_block-container > div");
const counterEl = document.querySelector(".choosed_block span");

const choosedState = {
  countElements: 0,
  setCountValue(value) {
    this.countElements += value;
    counterEl.innerText = this.countElements;
  },
};
const eventFunc = (e) => {
  if (e.target.className === "") {
    e.target.className = "choosed_element";
    choosedState.setCountValue(1);
  } else {
    e.target.className = "";
    choosedState.setCountValue(-1);
  }
};

for (let i = 0; i < choosedEl.length; i++) {
  choosedEl[i].addEventListener("click", eventFunc);
}

const postsBlock = document.querySelector(".posts_block-container");
const showPostBtn = document.querySelector(".posts_block button");

function addPost(title, body) {
  const postTitle = document.createElement("h3");
  const postBody = document.createElement("span");
  const postItem = document.createElement("p");

  postTitle.innerText = title;
  postBody.innerText = body;

  postItem.append(postTitle, postBody);
  postsBlock.append(postItem);
}

function getPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      for (item of json) {
        addPost(item.title, item.body);
      }
    })
    .catch((err) => console.log(err.message));
}
showPostBtn.onclick = getPosts;
