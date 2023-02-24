const skill = document.getElementById("skill");
const isLove = document.getElementById("isLove");

const skillText = prompt("Какой язык вы учите?", "пока не в курсе");
const isLoveValue = confirm("Вы любите изучаемый язык");

skill.innerText = skillText;
isLove.innerText = isLoveValue;
