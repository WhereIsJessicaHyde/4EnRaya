var board =  new Board();

function addTile (event) {
  var position = board.insertTile(event.currentTarget.dataset.column);
  if(position) {
    renderTile(position);
    gameStatus();
    board.takeTurns();
  }
}

function renderTile (position) {
  var boardElement= document.getElementById("game-board");
  var rowElement = boardElement.getElementsByClassName("row")[position[0]];
  var cellElement= rowElement.getElementsByTagName("div")[position[1]];
  cellElement.classList += (" tile-" + board.turn);
}

function gameStatus () {
  var winner = board.checkWinner();

  if (winner) {
    var winMessage = document.getElementById('game-over');
    winMessage.childNodes[3].append(winner.toUpperCase() + "   WINS!!!");
    document.getElementById("game-over").className = "";
  }
}

window.onload = function () {
  var buttons = document.getElementsByClassName("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", addTile);
  }
};
