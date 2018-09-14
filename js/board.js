function Board () {
  this.matrix = [[null, null, null, null, null, null, null],
                 [null, null, null, null, null, null, null],
                 [null, null, null, null, null, null, null],
                 [null, null, null, null, null, null, null],
                 [null, null, null, null, null, null, null],
                 [null, null, null, null, null, null, null]];
  this.winner  = null;
  this.player1 = "red";
  this.player2 = "green";
  this.turn    = this.player1;
}

Board.prototype.insertTile = function (column) {
  var row  = null;
  var cells = this._getColumn(column);

  var i = cells.length - 1;
  while (i >= 0 && row === null) {
    if (cells[i] === null) {row = i;}

    i--;
  }
  if (row || row === 0) {
    this.matrix[row][column] = this.turn;
    return [row, parseInt(column)];
  }
  else {
    return false;
  }

};

Board.prototype._getColumn = function(column){
    var cells = [];

    this.matrix.forEach(function(row) {
        cells.push(row[column]);
    });

  return cells;
};

Board.prototype.chkLine = function(a,b,c,d) {
   // Check first cell non-zero and all cells match
   var z = ((a !== 0) && (a ===b) && (a === c) && (a === d));
   return ((a !== 0) && (a ===b) && (a === c) && (a === d));
};

Board.prototype._checkDownRight = function() {
  for (var row = 0; row < 3; row++) {
    for (var column = 0; column < 4; column++) {
      if (this.chkLine(this.matrix[row][column],
                       this.matrix[row + 1][column + 1],
                       this.matrix[row + 2][column + 2],
                       this.matrix[row + 3][column + 3])){
        this.winner = this.matrix[row][column];
      }
    }
  }
};

Board.prototype._checkDownLeft = function() {
  for (var row = 3; row < 6; row++)
    for (var column = 0; column < 4; column++)
      if (this.chkLine(this.matrix[row][column],
                       this.matrix[row - 1][column + 1],
                       this.matrix[row - 2][column + 2],
                       this.matrix[row - 3][column + 3])){
        this.winner = this.matrix[row][column];
      }
};

Board.prototype._checkDown = function() {
  for (var row = 0; row < 3; row++) {
    for (var column = 0; column < 7; column++) {
      if (this.chkLine(this.matrix[row][column],
                       this.matrix[row + 1][column],
                       this.matrix[row + 2][column],
                       this.matrix[row + 3][column])){
        this.winner = this.matrix[row][column];
      }
      if(this.winner){return;}
    }
  }
};

Board.prototype._checkRight = function() {
  for (var row = 0; row < 6; row++)
    for (var column = 0; column < 4; column++)
      if (this.chkLine(this.matrix[row][column],
                       this.matrix[row][column + 1],
                       this.matrix[row][column + 2],
                       this.matrix[row][column + 3])){
        this.winner = this.matrix[row][column];
      }
};

Board.prototype.checkWinner = function() {
  if(!this.winner) this._checkRight();
  if(!this.winner) this._checkDown();
  if(!this.winner) this._checkDownLeft();
  if(!this.winner) this._checkDownRight();
  if (this.winner) {return this.winner;}
};

Board.prototype.takeTurns = function () {
  this.turn = this.turn === this.player1 ? this.player2 : this.player1;
};
