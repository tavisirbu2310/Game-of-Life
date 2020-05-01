document.addEventListener('DOMContentLoaded', function () {

    var GameofLife = function (boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.querySelector('#board');
        this.cell = [];
        this.createBoard = function () {
            this.board.style.width = (parseInt(this.width) * 10) + 'px';
            this.board.style.height = (parseInt(this.height) * 10) + 'px';
            var noOfCells = this.width * this.height;
            for (var i = 0; i < noOfCells; i++) {
                var divCreate = document.createElement('div');
                this.board.appendChild(divCreate);
                this.cell.push(this.board.querySelectorAll('div')[i]);
            }
            this.cell.forEach(function (element) {
                element.addEventListener('click', function () {
                    element.classList.toggle('live');
                });
            })
        };
        this.index = function (x, y) {
            return x + (y * this.width);
        };
        this.setCellState = function (x, y, state) {
            this.cell[this.index(x, y)].classList.toggle(state);
        };
        this.firstGlider = function (x, y) {
            this.setCellState(x, y, 'live');
            this.setCellState(x, y+1, 'live');
            this.setCellState(x, y+2, 'live');
            this.setCellState(x, y+3, 'live');
            this.setCellState(x, y+4, 'live');
            this.setCellState(x-1, y+4, 'live');
            this.setCellState(x-2, y+4, 'live');

            this.setCellState(x+4, y, 'live');
            this.setCellState(x+5, y, 'live');
            this.setCellState(x+6, y, 'live');
            this.setCellState(x+7, y, 'live');

            this.setCellState(x+4, y+1, 'live');
            this.setCellState(x+4, y+2, 'live');
            this.setCellState(x+5, y+2, 'live');
            this.setCellState(x+6, y+2, 'live');
            this.setCellState(x+7, y+2, 'live');


            this.setCellState(x+7, y+3, 'live');
            this.setCellState(x+7, y+4, 'live');

            this.setCellState(x+6, y+4, 'live');
            this.setCellState(x+5, y+4, 'live');
            this.setCellState(x+4, y+4, 'live');
        };
        this.computeCellNextState = function (x, y) {
            this.count = 0;
            if (y-1>=0){ //Making sure the position is not on the 1st row
                if (this.cell[this.index(x,y-1)].classList.contains('live')){
                    this.count++;
                }
            }
            if (y-1>=0 && x-1>=0){ //Making sure position is not in the first cell & not on the first row
                if (this.cell[this.index(x-1,y-1)].classList.contains('live')){
                    this.count++;
                }
            }
            if (y-1>=0 && x+1<this.width){ //Not on first row last column
                if (this.cell[this.index(x+1,y-1)].classList.contains('live')){
                    this.count++;
                }
            }
            if (x-1>=0){//Not on first column
                if (this.cell[this.index(x-1,y)].classList.contains('live')){
                    this.count++;
                }
            }

            if (x+1<this.width){ //Not on last column
                if (this.cell[this.index(x+1,y)].classList.contains('live')){
                    this.count++;
                }
            }

            if (y+1<this.height && x-1>=0){ //Not on the bottom left corner
                if (this.cell[this.index(x-1,y+1)].classList.contains('live')){
                    this.count++;
                }
            }

            if (y+1<this.height && x+1<this.width){ //Not on the bottom right corner
                if (this.cell[this.index(x+1,y+1)].classList.contains('live')){
                    this.count++;
                }
            }

            if (y+1<this.height){//Not on the last row
                if (this.cell[this.index(x,y+1)].classList.contains('live')){
                    this.count++;
                }
            }

            //Checking the count value, and returning the right number, according to the game rules.

            if (this.cell[this.index(x, y)].classList.contains('live')) {
                if (this.count < 2 || this.count > 3) {
                    return 0;
                } else if (this.count === 2 || this.count === 3) {
                    return 1;
                }
             }
            if (!this.cell[this.index(x, y)].classList.contains('live')) {
                if (this.count===3){
                    return 1;
                }else{
                    return 0;
                }
            }
        };
        this.state = [];
        this.computeNextGeneration = function () {
            for (var i = 0; i < this.height; i++) {
                for (var j = 0; j < this.width; j++) {
                    this.state.push(this.computeCellNextState(j, i));
                }
            }

        };
        this.printNextGeneration=function () {
            this.computeNextGeneration();
            for (var i=0;i<this.height;i++){
                for (var j=0;j<this.width;j++){
                    if (this.computeCellNextState(j,i)===1 && !this.cell[this.index(j,i)].classList.contains('live')){
                        this.cell[this.index(j,i)].classList.add('live');
                    }
                    if (this.computeCellNextState(j,i)===0 && this.cell[this.index(j,i)].classList.contains('live')){
                        this.cell[this.index(j,i)].classList.remove('live');
                    }
                }
            }
        };
        var self=this;
        this.start=function () {
            this.animated=setInterval(function () {
                self.printNextGeneration();

            },250);
        };
    };

    document.querySelector('#value').addEventListener('click',function getValues(e) {
        var x=document.querySelector('#width').value;
        var y=document.querySelector('#height').value;
        if(x<=100 && y<=100){
            var game = new GameofLife(x, y);
            game.createBoard();
            game.computeNextGeneration();
            game.firstGlider(Math.floor(Math.random()*9),Math.floor(Math.random()*9));
            document.querySelector('#play').addEventListener('click',function () {
                game.start();

            });
            document.querySelector('#pause').addEventListener('click',function () {
                clearTimeout(game.animated);

            });
        }else{
            alert('Please specify 2 numbers not greater than 100!');
        }


    });
});
