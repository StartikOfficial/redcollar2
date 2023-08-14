const startingField = `
<table id="game">
<tbody>
    <tr>
        <td class="cell" id="cell1"></td>
        <td class="cell" id="cell2"></td>
        <td class="cell" id="cell3"></td>
    </tr>
    <tr>
        <td class="cell" id="cell4"></td>
        <td class="cell" id="cell5"></td>
        <td class="cell" id="cell6"></td>
    </tr>
    <tr>
        <td class="cell" id="cell7"></td>
        <td class="cell" id="cell8"></td>
        <td class="cell" id="cell9"></td>
    </tr>
</tbody>
</table>
`; // начальное поле игры
const gameContainer = document.querySelector("#game-container");
const gameStatus = document.querySelector("#game-status");
const playerTurn = document.querySelector("#game-turn__player");
let mark = "close"; // переменная с содержанием крестика или нолика, иначе марка
const cells = []; // в массив записываются по индексу ходы
let cellsCounter = 0; // количество ходов
const winCombinationsIndexes = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // по горизонтали
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // по вертикали
  [0, 4, 8], [2, 4, 6], // по диагонали
]; // все возможные комбинации победы по индексам

let possibleWinCombinatios = []; // возможные комбинации победы
let someoneWin = false; // флаг победы

gameContainer.addEventListener("click", placeMark); // по клику клетки ставим марку

// функция для обновления поля
function drawNewField() {
  gameContainer.innerHTML = "";
  gameContainer.insertAdjacentHTML("afterbegin", startingField);
  someoneWin = false;
  winCounter = 0;
  cellsCounter = 0;
  cells.length = 0;
  gameStatus.innerHTML = "Идет игра...";

  checkTurn();

  return;
}

// функция, рассчитывающая дальнейшие действия после постановки марки
function placeMark(e) {
  // проверка, чтобы марка ставилась на пустую клетку, если продолжается игра
  if (e.target.classList.contains("close") 
  || e.target.classList.contains("round") 
  || !e.target.classList.contains("cell")
  || someoneWin) {return};

  const id = +(e.target.id[4]) - 1;

  // добавление помеченной клетки в массив клеток
  cells[id] = mark;
  e.target.classList.add(mark);

  // только после 3 помеченных клеток будет подбираться возможная комбинация через фильтр
  if (cellsCounter > 3) {possibleWinCombinatios = winCombinationsIndexes.filter(el => el.includes(id));}

  // проверка победителя по возможным комбинациям
  if (checkWin(possibleWinCombinatios)) {return};

  // смена хода
  if (mark === "close") {
    mark = "round";
    playerTurn.innerHTML = "Ход второго игрока"
  } else {
    mark = "close";
    playerTurn.innerHTML = "Ход первого игрока"
  }
  
  cellsCounter++;
  
  // все клетки заполнены, а победителя нет, тогда ничья
  if (cellsCounter === 9) {alert("Ничья!")}

  return;
}

// функция, определяющая победителя
function checkWin(possibleWinCombinatios) {
  // проверка, чтобы клеток было не менее 4 (что-то напободие оптимизации)
  if (cellsCounter < 4) {return};

  // цикл перебирающий возможные комбинации
  for (let combination of possibleWinCombinatios) {
    let winCounter = 0;
    for (let index of combination) {
      if (cells[index] !== mark) {break};
      winCounter++;
    };
    
    // если все три индекса в комбинации одной метки, тогда победа
    if (winCounter === 3) {
      const player1Score = document.querySelector("#player1__score");
      const player2Score = document.querySelector("#player2__score");
      const player1Name = document.querySelector("#player1__name").value || "Player1";
      const player2Name = document.querySelector("#player2__name").value || "Player2";
      if (mark === "close") {
        alert(`Игрок ${player1Name} победил!`);
        player1Score.innerHTML = +player1Score.innerHTML + 1;
      } else {
        alert(`Игрок ${player2Name} победил!`);
        player2Score.innerHTML = +player2Score.innerHTML + 1;
      }
      someoneWin = true;

      gameStatus.innerHTML = "Игра закончена";

      break;
    }
  }

  return someoneWin;
}

// проверка, кто ходит первым
function checkTurn() {
  const turn = document.querySelector("#game-turn");
  if (cellsCounter > 0) {return};
  if (turn.checked) {
    mark = "round";
    playerTurn.innerHTML = "Ход второго игрока";
  } else {
    mark = "close";
    playerTurn.innerHTML = "Ход первого игрока";
  };

  return;
}

drawNewField()

