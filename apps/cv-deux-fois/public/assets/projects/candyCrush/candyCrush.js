const canvasGame = document.getElementById("canvas-game");
const ctxGame = canvasGame.getContext("2d");
let canvasWidth = canvasGame.width;
const canvasHeight = canvasGame.height;
// canvasWidth = 2 * canvasWidth
// canvasGame.width = canvasWidth;

const score = document.getElementById("score-value");
const candysType = ["Blue", "Green", "Red", "Yellow", "Orange"];
const nbTypes = candysType.length;
let nbRow = 10;
let candySize = 50;
if (window.screen.availWidth < 1300 || window.screen.availHeight < 1300) {
    nbRow = 7;
}
if (window.screen.availWidth < 500 || window.screen.availHeight < 500) {
    const candysType = ["Blue", "Green", "Red"];
    nbRow = 4;
}
canvasGame.height = nbRow * candySize;
canvasGame.width = nbRow * candySize;
const connexes = [[0,1],[1,0],[-1,0],[0,-1]]

var inAnimation = false;
const animationTime = 100;

const isEmpty = (obj) => Object.keys(obj).length === 0;
// check if a : array, is in b : matrix (array of arrays)
const includes = (a,b) => b.some(x => a.every((v, i) => v === x[i]));



class Sprites {
    constructor(img, w, h) {
        this.img = img;
        this.w = w;
        this.h = h;
    }

    draw(value, pos) {
        ctxGame.drawImage(this.img[value], pos.x*candySize, pos.y*candySize, this.w, this.h);
    }

    clear(pos) {
        ctxGame.clearRect(pos.x*candySize, pos.y*candySize-2, this.w, this.h+2);
    }
}



class Modele {
    constructor() {
        this.board = this.initBoard(nbRow);
        this.firstSelected = false;
    }


    initBoard(size) {
        let board = []
        for (let i = 0; i < size; i++) {
            board.push([]);
            for (let j = 0; j < size; j++) {
                board[i].push(Math.floor(Math.random() * nbTypes));
            }
        }
        return board;
    }


    checkSelected(posSelected) {
        let answer = {}
        if (this.firstSelected) {
            // compute distance between selected and first selected
            let dist = posSelected.map((v, i) => v - this.firstSelected[i]);
            if (includes(dist, connexes)) {
                let oldPos = {x: this.firstSelected[0], y: this.firstSelected[1]};
                let oldValue = this.board[this.firstSelected[0]][this.firstSelected[1]];
                let newPos = {x: posSelected[0], y: posSelected[1]};
                let newValue = this.board[posSelected[0]][posSelected[1]];
                this.firstSelected = false;
                answer = [{value: oldValue, pos: oldPos}, {value: newValue, pos: newPos}];
            }
        } else {
            this.firstSelected = posSelected;
            let pos = {x: posSelected[0], y: posSelected[1]};
            let value = this.board[posSelected[0]][posSelected[1]];
            
            answer = {value: value, pos: pos};
        }
        return answer;
    }

    unselect(pos) {
        this.firstSelected = false;
    }


    swap(oldCandys, newCandys) {
        this.board[oldCandys.pos.x][oldCandys.pos.y] = newCandys.value;
        this.board[newCandys.pos.x][newCandys.pos.y] = oldCandys.value;
    }


    getNeighbors(pos) {
        let result = [];
        for (let i = 0; i < connexes.length; i++) {
            let x = pos[0] + connexes[i][0];
            let y = pos[1] + connexes[i][1];
            if (x >= 0 && x < nbRow && y >= 0 && y < nbRow) {
                result.push([x, y]);
            }
        }
        return result;
    }



    checkExplosion() {
        let explodedCandys = [];
        for (let i = 0; i < nbRow; i++) {
            for (let j = 0; j < nbRow; j++) {
                if (! explodedCandys.includes(this.board[i][j])) {

                    let sameNeighbors =  this.getNeighbors([i, j])
                                            .filter(v => this.board[v[0]][v[1]] === this.board[i][j]);
                    let Xneighbors = sameNeighbors.filter(v => v[0] === i);
                    let Yneighbors = sameNeighbors.filter(v => v[1] === j);

                    if (Xneighbors.length >= 2) {
                        explodedCandys.push({type: this.board[i][j], pos: {x: i, y: j}});
                        for (let neighbors of Xneighbors) 
                            explodedCandys.push({type: this.board[neighbors[0]][neighbors[1]], pos: {x: neighbors[0], y: neighbors[1]}});
                    }
                    if (Yneighbors.length >= 2) {
                        explodedCandys.push({type: this.board[i][j], pos: {x: i, y: j}});
                        for (let neighbors of Yneighbors) 
                            explodedCandys.push({type: this.board[neighbors[0]][neighbors[1]], pos: {x: neighbors[0], y: neighbors[1]}});
                    }
                }
            }
            
        }

        for (let candy of explodedCandys) {
            this.board[candy.pos.x][candy.pos.y] = -1;
        }
        if (explodedCandys.length > 0) {
            return explodedCandys;
        }

        return false;
    }




    getUpStandUpCandys() {
        let replaced = [];
        for (let i = nbRow-1 ; i >= 0; i--) {
            for (let j = nbRow-1 ; j >= 0; j--){
                if (this.board[i][j] === -1) {
                    for (let k = j-1; k >= 0; k--) {
                        if (this.board[i][k] !== -1) {
                            this.board[i][j] = this.board[i][k];
                            this.board[i][k] = -1;
                            replaced.push([i, k]);
                            break;
                        }
                    }
                }
            }
        }
        return [...this.board.map(row => [...row])];
    }


    replaceExplosedCandies() {
        for (let i = 0; i < nbRow; i++) {
            for (let j = 0; j < nbRow; j++) {
                if (this.board[i][j] === -1) {
                    this.board[i][j] = Math.floor(Math.random() * nbTypes);
                }
            }
        }
        return this.board;
    }


    fallingCandie(pos) {
        if (this.board[pos[0]][pos[1] +1] === -1) {
            this.board[pos[0]][pos[1] +1] = this.board[pos[0]][pos[1]];
            this.board[pos[0]][pos[1]] = Math.floor(Math.random() * nbTypes);
            return true;
        }
        return false;
    }

}


class Vue {
    constructor(board) {
        this.sprites = this.initSprites();
        this.initBoard(board);
    }

    initSprites() {
        let sprites = new Sprites(candysType.map(type => new Image()), candySize, candySize);
        sprites.img.forEach((img, i) => {
            img.src = "img/" + candysType[i] + ".png";
        });
        return sprites;
    }


    initBoard(board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                this.sprites.img[board[i][j]].onload = () => {
                    this.drawBoard(board);
                }
            }
        }
    } 


    drawBoard(board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] !== -1) 
                this.sprites.draw(board[i][j], {x: i, y: j});
            }
        }
    }


    select(pos) {
        ctxGame.fillStyle = "rgba(1,1,1,0.2)";
        ctxGame.fillRect(pos.x*candySize, pos.y*candySize, candySize, candySize);
    }

    unselect(candy) {
        ctxGame.fillStyle = "rgba(1,1,1,1)";
        ctxGame.clearRect(candy.pos.x*candySize, candy.pos.y*candySize, candySize, candySize);
        this.sprites.draw(candy.value, candy.pos);
    }


    drawSwapping(candy1, candy2) {
        inAnimation = true;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        let dt = 0;
        let interval = setInterval(function() {
            dt += 1;
            if (dt > (animationTime)) {
                clearInterval(interval);
                inAnimation = false;
                return;
            }
            self.sprites.clear(candy1.pos);
            self.sprites.clear(candy2.pos);

            self.sprites.draw(candy1.value, self.computePosSwapping(candy1.pos, candy2.pos, dt));
            self.sprites.draw(candy2.value, self.computePosSwapping(candy2.pos, candy1.pos, dt));
        }, 1);
    }


    computePosSwapping(pos1, pos2, dt) {
        let x = pos1.x + (pos2.x - pos1.x) * dt / (animationTime);
        let y = pos1.y + (pos2.y - pos1.y) * dt / (animationTime);
        return {x: x, y: y};
    }


    drawExplosion(explosion) {    
        // delete candys and redraw them
        inAnimation = true;
        for (let candy of explosion) {
            this.sprites.clear(candy.pos);
            // clear candys above the explosion
            for (let i = candy.pos.y; i >= 0; i--) {
                this.sprites.clear({x: candy.pos.x, y: i});
            }
        }
        inAnimation = false;
    }


    drawFallingCandies(oldBoard, replaced, newBoard) {
        inAnimation = true;
        let nbCaseFalling = this.computeHowManyCaseFalling(oldBoard)
        let dt = 0;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let self = this;
        let interval = setInterval(function() {
            dt += 1;
            if (dt > animationTime) {
                clearInterval(interval);
                inAnimation = false;
                return;
            }
            for (let i = 0; i < oldBoard.length; i++) {
                for (let j = 0; j < oldBoard.length; j++) {
                    if (oldBoard[i][j] !== -1 ) {
                        let pos = {x: i, y: j + dt * nbCaseFalling[i][j] / animationTime};
                        self.sprites.clear(pos); 
                        self.sprites.clear([i, j+nbCaseFalling[i][j]]);    
                        self.sprites.draw(oldBoard[i][j], pos); 
                    }
                }
            }
            for (let i = newBoard.length-1; i >= 0; i--) {
                for (let j = newBoard.length-1; j >= 0; j--) {
                    if (replaced[i][j] === -1 && newBoard[i][j] !== -1) {
                        let startPos = 0;
                        for (let k = 0; k < nbRow; k++) {
                            if (replaced[i][k] !== -1) break
                            startPos += 1;
                        }
                        let pos = {x: i, y: j-startPos + dt * (startPos)/ animationTime};
                        self.sprites.clear(pos); 
                        self.sprites.draw(newBoard[i][j], pos); 
                }
                }
            }
        }, 1);
    }


    
    computeHowManyCaseFalling(oldBoard) {
        let nbCaseFalling = [];
        for (let i = 0; i < nbRow; i++) {
            nbCaseFalling[i] = [];
            for (let j = 0; j < nbRow; j++) {
                nbCaseFalling[i][j] = 0;
                if (oldBoard[i][j] !== -1) {
                    // compute how manu candys == -1 in the same column > i
                    for (let k = j + 1; k < nbRow; k++) {
                        if (oldBoard[i][k] === -1) {
                            nbCaseFalling[i][j] += 1;
                        }
                    }                 
                }
            }
        }
        return nbCaseFalling;
    }
}

class Controller {
    constructor() {
        this.model = new Modele();
        this.vue = new Vue(this.model.board);
        this.firstSwap = false
        this.handleExplosions(true)
        this.score = 0;
    }

    posToIndex(pos) {
        return [Math.floor(pos[0] / candySize), Math.floor(pos[1] / candySize)];
    }


    async handleExplosions(beforePlaying = false) {
        let explosions = this.model.checkExplosion();
        if (!explosions.length) return false
        while (explosions.length) {
            await new Promise(resolve => setTimeout(resolve, 50));
            if (!beforePlaying) {
                this.score += explosions.length;
                score.innerText = this.score;
            }
            var oldBoard = [...this.model.board.map(row => [...row])];

            this.vue.drawExplosion(explosions);

            var replaced = this.model.getUpStandUpCandys();
            var newBoard = this.model.replaceExplosedCandies();
            this.vue.drawFallingCandies(oldBoard, replaced, newBoard);
            explosions = this.model.checkExplosion();  
            await new Promise(resolve => setTimeout(resolve, animationTime*nbRow));            
        }
        return true;
    }


    async handleClick(x,y) {

        let posIndex = game.posToIndex([x, y]);
        const swiped = game.model.checkSelected(posIndex);
        
        if (!swiped.length) {
            if (!isEmpty(swiped)) {
                game.vue.select(swiped.pos);
                this.firstSwap = {value: swiped.value, pos: {...swiped.pos}}
            }
            else if (this.firstSwap)
            {
                game.vue.unselect(this.firstSwap);
                this.model.unselect(this.firstSwap.pos);
                this.firstSwap = false;
            }
            
        }
        else {
            game.model.swap(swiped[0], swiped[1]);
            game.vue.drawSwapping(swiped[1], swiped[0]); 
            await new Promise(resolve => setTimeout(resolve, animationTime*4));
            let explosions = this.model.checkExplosion();
            if (explosions.length) {         
                this.handleExplosions();
            }
            else {
                let tmp = swiped[0].value;
                swiped[0].value = swiped[1].value;
                swiped[1].value = tmp;
                this.model.swap(swiped[0], swiped[1]);
                game.vue.drawSwapping(swiped[0], swiped[1]);
                
            }
        }
    }
}



// eslint-disable-next-line no-restricted-globals
addEventListener("click", function(e) {
    if (inAnimation) return;
    let x = e.pageX - canvasGame.offsetLeft;
    let y = e.pageY - canvasGame.offsetTop;
    if (x > 0 && x < canvasGame.width && y > 0 && y < canvasGame.height) {       
        game.handleClick(x,y) 
    }
});

const game = new Controller;
