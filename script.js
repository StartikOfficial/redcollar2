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
`;
const gameContainer = document.querySelector("#game-container");
const gameStatus = document.querySelector("#game-status");
const playerTurn = document.querySelector("#game-turn__player");
let mark = "close";
const cells = [];
let cellsCounter = 0;
const winCombinationsIndexes = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // по горизонтали
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // по вертикали
  [0, 4, 8], [2, 4, 6], // по диагонали
];
let possibleWinCombinatios = [];
let someoneWin = false;

gameContainer.addEventListener("click", placeMark);

function drawNewField() {
  gameContainer.innerHTML = "";
  gameContainer.insertAdjacentHTML("afterbegin", startingField);
  mark = "close";
  someoneWin = false;
  winCounter = 0;
  cellsCounter = 0;
  cells.length = 0;
  gameStatus.innerHTML = "Идет игра...";

  checkTurn();

  return;
}

function placeMark(e) {
  if (e.target.classList.contains("close") 
  || e.target.classList.contains("round") 
  || !e.target.classList.contains("cell")
  || someoneWin) {return};
  const id = +(e.target.id[4]) - 1;
  cells[id] = mark;
  e.target.classList.add(mark);

  if (cellsCounter > 3) {possibleWinCombinatios = winCombinationsIndexes.filter(el => el.includes(id));}

  if (checkWin(possibleWinCombinatios)) {return};

  if (mark === "close") {
    mark = "round";
    playerTurn.innerHTML = "Ход второго игрока"
  } else {
    mark = "close";
    playerTurn.innerHTML = "Ход первого игрока"
  }
  
  cellsCounter++;

  return;
}

function checkWin(possibleWinCombinatios) {
  if (cellsCounter < 4) {return};
  for (let combination of possibleWinCombinatios) {
    let winCounter = 0;
    for (let index of combination) {
      if (cells[index] !== mark) {break};
      winCounter++;
    };

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

