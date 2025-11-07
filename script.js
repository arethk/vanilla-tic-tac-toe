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
        this.xCount = document.querySelector("#xcount");
        this.tieCount = document.querySelector("#tiecount");
        this.oCount = document.querySelector("#ocount");
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
        self.clearCells();
        self.setCount(self.xCount, 0);
        self.setCount(self.tieCount, 0);
        self.setCount(self.oCount, 0);
        self.blockUI = self.xDropdown.value === "cpu";
        self.isXTurn = true;
    }

    clearCells() {
        this.cells.forEach((cell) => {
            cell.classList.remove("x");
            cell.classList.remove("o");
            cell.classList.remove("dim");
        });
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

        if (self.isXTurn === true) {
            event.target.classList.add("x");
        } else {
            event.target.classList.add("o");
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
            this.processWin(winner, winners);
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
            }
        }
        this.blockUI = false;
    }

    processWin(winner, winnerCells) {
        this.cells.forEach((cell) => {
            if (winnerCells.includes(cell) === false) {
                cell.classList.add("dim");
            }
        });

        if (winner === "x") {
            this.setCount(this.xCount, this.getCount(this.xCount) + 1);
        } else {
            this.setCount(this.oCount, this.getCount(this.oCount) + 1);
        }
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