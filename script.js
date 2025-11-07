class TicTacToe {
    constructor() {
        // singelton
        if (TicTacToe.instance) {
            return TicTacToe.instance;
        }
        TicTacToe.instance = this;

        // make the ui selectors handy and setup event listeners
        this.xDropdown = document.querySelector("#xplayerdd");
        this.oDropdown = document.querySelector("#oplayerdd");
        this.info = document.querySelector(".header-middle");
        this.xCount = document.querySelector("#xcount");
        this.tieCount = document.querySelector("#tiecount");
        this.oCount = document.querySelector("#ocount");
        this.timerInterval = null;
        this.cells = [];

        for (let i = 0; i <= 8; i++) {
            const cell = document.querySelector(".cell" + i);
            cell.addEventListener("click", this.handleCellClick);
            this.cells.push(cell);
        }

        this.xDropdown.addEventListener("change", this.reset);
        this.oDropdown.addEventListener("change", this.reset);
        this.reset();
    }

    reset() {
        const self = TicTacToe.instance;
        if (self.timerInterval) {
            clearTimeout(self.timerInterval);
        }
        self.isXCPU = self.xDropdown.value === "cpu";
        self.isOCPU = self.oDropdown.value === "cpu";
        self.blockUI = self.isXCPU === true;
        self.isXTurn = true;
        self.setCount(self.xCount, 0);
        self.setCount(self.tieCount, 0);
        self.setCount(self.oCount, 0);
        self.clearCells();
    }

    handleCPUTurn() {
        const self = TicTacToe.instance;
        if (self.isGameOver() === true) {
            console.log("Game is over!");
            return;
        }
        const availableCells = [];
        for (let i = 0; i < self.cells.length; i++) {
            const cell = self.cells[i];
            const classes = Array.from(cell.classList);
            if ((classes.includes("x") || classes.includes("o")) === false) {
                availableCells.push(cell);
            }
        }
        if (availableCells.length > 0) {
            self.shuffle(availableCells);
            const selection = availableCells[0];
            self.handleSelection(selection);
        } else {
            console.log("Nothing available!");
        }
    }

    shuffle(array) {
        if (Array.isArray(array) === false) {
            throw "Argument must be an array";
        }
        let currentIndex = array.length;
        let randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    clearCells() {
        const self = TicTacToe.instance;
        self.handleTurnMsg();
        self.cells.forEach((cell) => {
            cell.classList.remove("x");
            cell.classList.remove("o");
            cell.classList.remove("dim");
        });
        if ((self.isXTurn === true && self.isXCPU === true) || (self.isXTurn === false && self.isOCPU === true)) {
            self.handleCPUTurn();
        }
    }

    isGameOver() {
        let cellClickedCount = 0;
        for (let i = 0; i < this.cells.length; i++) {
            const cell = this.cells[i];
            const classes = Array.from(cell.classList);
            if (classes.includes("dim")) {
                return true;
            } else if (classes.includes("x") || classes.includes("o")) {
                ++cellClickedCount;
            }
        }
        return cellClickedCount === 9;
    }

    handleCellClick(event) {
        const self = TicTacToe.instance;
        if (self.blockUI === true) {
            return;
        }
        if (self.isGameOver() === true) {
            self.clearCells();
            return;
        }
        const classes = Array.from(event.target.classList);
        if (classes.includes("x") || classes.includes("o")) {
            return;
        }
        self.handleSelection(event.target);
    }

    handleSelection(selection) {
        const self = TicTacToe.instance;
        if (self.isXTurn === true) {
            selection.classList.add("x");
        } else {
            selection.classList.add("o");
        }
        self.isXTurn = !self.isXTurn;
        self.processGame();
    }

    processGame() {
        this.blockUI = true;

        const c0 = Array.from(this.cells[0].classList);
        const c1 = Array.from(this.cells[1].classList);
        const c2 = Array.from(this.cells[2].classList);
        const c3 = Array.from(this.cells[3].classList);
        const c4 = Array.from(this.cells[4].classList);
        const c5 = Array.from(this.cells[5].classList);
        const c6 = Array.from(this.cells[6].classList);
        const c7 = Array.from(this.cells[7].classList);
        const c8 = Array.from(this.cells[8].classList);

        const winners = [];
        let winner = null;

        ["x", "o"].some((player) => {
            if (c0.includes(player) && c1.includes(player) && c2.includes(player)) {
                winners.push(this.cells[0]);
                winners.push(this.cells[1]);
                winners.push(this.cells[2]);
            } else if (c3.includes(player) && c4.includes(player) && c5.includes(player)) {
                winners.push(this.cells[3]);
                winners.push(this.cells[4]);
                winners.push(this.cells[5]);
            } else if (c6.includes(player) && c7.includes(player) && c8.includes(player)) {
                winners.push(this.cells[6]);
                winners.push(this.cells[7]);
                winners.push(this.cells[8]);
            } else if (c0.includes(player) && c3.includes(player) && c6.includes(player)) {
                winners.push(this.cells[0]);
                winners.push(this.cells[3]);
                winners.push(this.cells[6]);
            } else if (c1.includes(player) && c4.includes(player) && c7.includes(player)) {
                winners.push(this.cells[1]);
                winners.push(this.cells[4]);
                winners.push(this.cells[7]);
            } else if (c2.includes(player) && c5.includes(player) && c8.includes(player)) {
                winners.push(this.cells[2]);
                winners.push(this.cells[5]);
                winners.push(this.cells[8]);
            } else if (c0.includes(player) && c4.includes(player) && c8.includes(player)) {
                winners.push(this.cells[0]);
                winners.push(this.cells[4]);
                winners.push(this.cells[8]);
            } else if (c2.includes(player) && c4.includes(player) && c6.includes(player)) {
                winners.push(this.cells[2]);
                winners.push(this.cells[4]);
                winners.push(this.cells[6]);
            }
            if (winners.length === 3) {
                winner = player;
            }
            return winners.length === 3;
        });

        if (winner) {
            this.cells.forEach((cell) => {
                if (winners.includes(cell) === false) {
                    cell.classList.add("dim");
                }
            });

            if (winner === "x") {
                this.setCount(this.xCount, this.getCount(this.xCount) + 1);
                this.setInfoMsg("X Wins!");
            } else {
                this.setCount(this.oCount, this.getCount(this.oCount) + 1);
                this.setInfoMsg("O Wins!");
            }
            if ((this.isXTurn === true && this.isXCPU === true) || (this.isXTurn === false && this.isOCPU === true)) {
                this.timerInterval = setTimeout(this.clearCells, 1111);
                return;
            }
        } else {
            // handle tie
            if (
                c0.length == 2 &&
                c1.length == 2 &&
                c2.length == 2 &&
                c3.length == 2 &&
                c4.length == 2 &&
                c5.length == 2 &&
                c6.length == 2 &&
                c7.length == 2 &&
                c8.length == 2
            ) {
                this.setCount(this.tieCount, this.getCount(this.tieCount) + 1);
                this.setInfoMsg("Tie!");
                if ((this.isXTurn === true && this.isXCPU === true) || (this.isXTurn === false && this.isOCPU === true)) {
                    this.timerInterval = setTimeout(this.clearCells, 1111);
                    return;
                }
            } else {
                this.handleTurnMsg();
                if (this.isXTurn === true) {
                    if (this.isXCPU === true) {
                        this.timerInterval = setTimeout(this.handleCPUTurn, 777);
                        return;
                    }
                } else {
                    if (this.isOCPU === true) {
                        this.timerInterval = setTimeout(this.handleCPUTurn, 777);
                        return;
                    }
                }
            }
        }
        this.blockUI = false;
    }

    handleTurnMsg() {
        if (this.isXTurn === true) {
            this.setInfoMsg("X it's your turn!");
        } else {
            this.setInfoMsg("O it's your turn!");
        }
    }

    setInfoMsg(msg) {
        this.info.innerHTML = msg;
    }

    setCount(element, value) {
        element.innerHTML = value;
    }

    getCount(element,) {
        return parseInt(element.innerHTML);
    }

    destroy() {
        this.xDropdown.removeEventListener("change", this.reset);
        this.oDropdown.removeEventListener("change", this.reset);
        this.cells.forEach((cell) => {
            cell.removeEventListener("click", this.handleCellClick);
        });
    }
}

window.onbeforeunload = function () {
    ttt.destroy();
}

const ttt = new TicTacToe();