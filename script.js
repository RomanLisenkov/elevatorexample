const leftblock = document.querySelector(".elevator__leftblock");

// Позиционирование кабины в шахте дома по умолчанию трехэтажного (шахта - floor)
const cabin = document.querySelector(".elevator__cabin");
const floor = document.querySelector(".elevator__centerblock");
cabin.style.left = leftblock.getBoundingClientRect().width + "px";
cabin.style.width = parseInt(floor.getBoundingClientRect().width) - 4 + "px";
cabin.style.height = parseInt(floor.getBoundingClientRect().height) - 4 + "px";

const elevator = document.querySelector(".elevator");

// Функция создания этажа

function createfloor(numfloor) {
  let left = document.createElement("div");
  left.className = "elevator__leftblock";
  left.dataset.floor = numfloor;
  let center = document.createElement("div");
  center.className = "elevator__centerblock";
  center.dataset.floor = numfloor;
  let right = document.createElement("div");
  right.className = "elevator__rightblock";
  right.dataset.floor = numfloor;
  let elbutton = document.createElement("button");
  elbutton.className = "elevator__button";
  let elnumber = document.createElement("div");
  elnumber.className = "elevator__number";
  elnumber.innerText = numfloor;
  right.append(elbutton);
  right.append(elnumber);
  elevator.prepend(right);
  elevator.prepend(center);
  elevator.prepend(left);
}

const inputfloorchanging = document.querySelector(".floorchanging__input");
const buttonfloorchanging = document.querySelector(".floorchanging__button");

// Добавление кнопки Построить! в слушатель
// и позиционирование кабины в новом доме
buttonfloorchanging.addEventListener("click", function (event) {
  if (inputfloorchanging.value > 1 && inputfloorchanging.value < 15) {
    let removingnodes = elevator.querySelectorAll("[class*='block']");
    removingnodes.forEach((el) => {
      el.remove();
    });

    for (let k = 1; k <= inputfloorchanging.value; k++) {
      createfloor(k);
    }

    const floor = document.querySelector(".elevator__centerblock");
    const leftblock = document.querySelector(".elevator__leftblock");
    cabin.style.left = leftblock.getBoundingClientRect().width + "px";
    cabin.style.width =
      parseInt(floor.getBoundingClientRect().width) - 4 + "px";
    cabin.style.height =
      parseInt(floor.getBoundingClientRect().height) - 4 + "px";
    cabin.style.bottom = "0";
  }
});

// Функция движения кабины

function liftmoving() {
  const floor = document.querySelector(".elevator__centerblock");

  cabin.style.bottom =
    (parseInt(cabin.dataset.currentfloor) - 1) *
      parseInt(floor.getBoundingClientRect().height) +
    "px";
  const numbersfloors = document.querySelectorAll(".elevator__number");
  numbersfloors.forEach((element) => {
    element.innerText = element.innerText.replace("*", "");
    if (element.innerText === cabin.dataset.currentfloor) {
      element.innerText = element.innerText + "*";
    }
  });
}

const buttons = document.querySelectorAll(".elevator__button");

// Функция выключения кнопок для того чтобы нельзя было вызвать лифт если он находится в движении

function disablebuttons() {
  const buttons = document.querySelectorAll(".elevator__button");
  buttons.forEach((element) => {
    element.disabled = true;
  });
}

// Функция включения кнопок

function enablebuttons() {
  const buttons = document.querySelectorAll(".elevator__button");
  buttons.forEach((element) => {
    element.disabled = false;
  });
}

// Добавление на кнопки вызова лифта функций выключения, движения кабины и включения через 2 секунды (пока идёт движение)

elevator.addEventListener("click", function (event) {
  if (event.target.matches(".elevator__button")) {
    disablebuttons();
    setTimeout(enablebuttons, 2000);
    cabin.dataset.currentfloor = event.target.parentElement.dataset.floor;
    liftmoving();
  }
});
