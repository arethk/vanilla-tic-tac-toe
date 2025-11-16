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
        this.soundX = document.querySelector("#soundX");
        this.soundO = document.querySelector("#soundO");
        this.soundXWins = document.querySelector("#soundXWins");
        this.soundOWins = document.querySelector("#soundOWins");
        this.soundTie = document.querySelector("#soundTie");
        this.soundHumanVsHuman = document.querySelector("#soundHumanVsHuman");
        this.soundHumanVsAI = document.querySelector("#soundHumanVsAI");
        this.soundAIVsHuman = document.querySelector("#soundAIVsHuman");
        this.soundAIVsAI = document.querySelector("#soundAIVsAI");
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
        self.isXAI = self.xDropdown.value === "ai";
        self.isOAI = self.oDropdown.value === "ai";
        self.blockUI = self.isXAI === true;
        self.isXTurnAtStart = null; // set in clearCells()
        self.isXTurn = true;
        self.setCount(self.xCount, 0);
        self.setCount(self.tieCount, 0);
        self.setCount(self.oCount, 0);
        if (self.isXAI === true && self.isOAI === true) {
            self.playAIVsAISound();
        } else if (self.isXAI === true && self.isOAI === false) {
            self.playAIVsHumanSound();
        } else if (self.isXAI === false && self.isOAI === true) {
            self.playHumanVsAISound();
        } else if (self.isXAI === false && self.isOAI === false) {
            self.playHumanVsHumanSound();
        }
        self.clearCells();
    }

    areCellsSameValue(cellA, cellB) {
        if (Array.isArray(cellA) === false || Array.isArray(cellB) === false) {
            throw "Argument must be an array";
        }
        return (cellA.includes("x") && cellB.includes("x")) || (cellA.includes("o") && cellB.includes("o"));
    }

    areCellsWinnerReady(cellA, cellB) {
        const self = TicTacToe.instance;
        if (Array.isArray(cellA) === false || Array.isArray(cellB) === false) {
            throw "Argument must be an array";
        }
        if (self.isXTurn) {
            return cellA.includes("x") && cellB.includes("x");
        } else {
            return cellA.includes("o") && cellB.includes("o");
        }
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
            const availableBlocks = [];
            const availableWins = [];
            const c0 = Array.from(self.cells[0].classList);
            const c1 = Array.from(self.cells[1].classList);
            const c2 = Array.from(self.cells[2].classList);
            const c3 = Array.from(self.cells[3].classList);
            const c4 = Array.from(self.cells[4].classList);
            const c5 = Array.from(self.cells[5].classList);
            const c6 = Array.from(self.cells[6].classList);
            const c7 = Array.from(self.cells[7].classList);
            const c8 = Array.from(self.cells[8].classList);
            // horizontal checks
            if (availableCells.includes(self.cells[2]) && self.areCellsSameValue(c0, c1)) {
                if (self.areCellsWinnerReady(c0, c1)) {
                    availableWins.push(self.cells[2]);
                } else {
                    availableBlocks.push(self.cells[2]);
                }
            }
            if (availableCells.includes(self.cells[5]) && self.areCellsSameValue(c3, c4)) {
                if (self.areCellsWinnerReady(c3, c4)) {
                    availableWins.push(self.cells[5]);
                } else {
                    availableBlocks.push(self.cells[5]);
                }
            }
            if (availableCells.includes(self.cells[8]) && self.areCellsSameValue(c6, c7)) {
                if (self.areCellsWinnerReady(c6, c7)) {
                    availableWins.push(self.cells[8]);
                } else {
                    availableBlocks.push(self.cells[8]);
                }
            }
            if (availableCells.includes(self.cells[1]) && self.areCellsSameValue(c0, c2)) {
                if (self.areCellsWinnerReady(c0, c2)) {
                    availableWins.push(self.cells[1]);
                } else {
                    availableBlocks.push(self.cells[1]);
                }
            }
            if (availableCells.includes(self.cells[4]) && self.areCellsSameValue(c3, c5)) {
                if (self.areCellsWinnerReady(c3, c5)) {
                    availableWins.push(self.cells[4]);
                } else {
                    availableBlocks.push(self.cells[4]);
                }
            }
            if (availableCells.includes(self.cells[7]) && self.areCellsSameValue(c6, c8)) {
                if (self.areCellsWinnerReady(c6, c8)) {
                    availableWins.push(self.cells[7]);
                } else {
                    availableBlocks.push(self.cells[7]);
                }
            }
            if (availableCells.includes(self.cells[0]) && self.areCellsSameValue(c1, c2)) {
                if (self.areCellsWinnerReady(c1, c2)) {
                    availableWins.push(self.cells[0]);
                } else {
                    availableBlocks.push(self.cells[0]);
                }
            }
            if (availableCells.includes(self.cells[3]) && self.areCellsSameValue(c4, c5)) {
                if (self.areCellsWinnerReady(c4, c5)) {
                    availableWins.push(self.cells[3]);
                } else {
                    availableBlocks.push(self.cells[3]);
                }
            }
            if (availableCells.includes(self.cells[6]) && self.areCellsSameValue(c7, c8)) {
                if (self.areCellsWinnerReady(c7, c8)) {
                    availableWins.push(self.cells[6]);
                } else {
                    availableBlocks.push(self.cells[6]);
                }
            }

            // vertical checks
            if (availableCells.includes(self.cells[6]) && self.areCellsSameValue(c0, c3)) {
                if (self.areCellsWinnerReady(c0, c3)) {
                    availableWins.push(self.cells[6]);
                } else {
                    availableBlocks.push(self.cells[6]);
                }
            }
            if (availableCells.includes(self.cells[7]) && self.areCellsSameValue(c1, c4)) {
                if (self.areCellsWinnerReady(c1, c4)) {
                    availableWins.push(self.cells[7]);
                } else {
                    availableBlocks.push(self.cells[7]);
                }
            }
            if (availableCells.includes(self.cells[8]) && self.areCellsSameValue(c2, c5)) {
                if (self.areCellsWinnerReady(c2, c5)) {
                    availableWins.push(self.cells[8]);
                } else {
                    availableBlocks.push(self.cells[8]);
                }
            }
            if (availableCells.includes(self.cells[3]) && self.areCellsSameValue(c0, c6)) {
                if (self.areCellsWinnerReady(c0, c6)) {
                    availableWins.push(self.cells[3]);
                } else {
                    availableBlocks.push(self.cells[3]);
                }
            }
            if (availableCells.includes(self.cells[4]) && self.areCellsSameValue(c1, c7)) {
                if (self.areCellsWinnerReady(c1, c7)) {
                    availableWins.push(self.cells[4]);
                } else {
                    availableBlocks.push(self.cells[4]);
                }
            }
            if (availableCells.includes(self.cells[5]) && self.areCellsSameValue(c2, c8)) {
                if (self.areCellsWinnerReady(c2, c8)) {
                    availableWins.push(self.cells[5]);
                } else {
                    availableBlocks.push(self.cells[5]);
                }
            }
            if (availableCells.includes(self.cells[0]) && self.areCellsSameValue(c3, c6)) {
                if (self.areCellsWinnerReady(c3, c6)) {
                    availableWins.push(self.cells[0]);
                } else {
                    availableBlocks.push(self.cells[0]);
                }
            }
            if (availableCells.includes(self.cells[1]) && self.areCellsSameValue(c4, c7)) {
                if (self.areCellsWinnerReady(c4, c7)) {
                    availableWins.push(self.cells[1]);
                } else {
                    availableBlocks.push(self.cells[1]);
                }
            }
            if (availableCells.includes(self.cells[2]) && self.areCellsSameValue(c5, c8)) {
                if (self.areCellsWinnerReady(c5, c8)) {
                    availableWins.push(self.cells[2]);
                } else {
                    availableBlocks.push(self.cells[2]);
                }
            }

            // cross checks
            if (availableCells.includes(self.cells[8]) && self.areCellsSameValue(c0, c4)) {
                if (self.areCellsWinnerReady(c0, c4)) {
                    availableWins.push(self.cells[8]);
                } else {
                    availableBlocks.push(self.cells[8]);
                }
            }
            if (availableCells.includes(self.cells[4]) && self.areCellsSameValue(c0, c8)) {
                if (self.areCellsWinnerReady(c0, c8)) {
                    availableWins.push(self.cells[4]);
                } else {
                    availableBlocks.push(self.cells[4]);
                }
            }
            if (availableCells.includes(self.cells[0]) && self.areCellsSameValue(c4, c8)) {
                if (self.areCellsWinnerReady(c4, c8)) {
                    availableWins.push(self.cells[0]);
                } else {
                    availableBlocks.push(self.cells[0]);
                }
            }
            if (availableCells.includes(self.cells[6]) && self.areCellsSameValue(c2, c4)) {
                if (self.areCellsWinnerReady(c2, c4)) {
                    availableWins.push(self.cells[6]);
                } else {
                    availableBlocks.push(self.cells[6]);
                }
            }
            if (availableCells.includes(self.cells[4]) && self.areCellsSameValue(c2, c6)) {
                if (self.areCellsWinnerReady(c2, c6)) {
                    availableWins.push(self.cells[4]);
                } else {
                    availableBlocks.push(self.cells[4]);
                }
            }
            if (availableCells.includes(self.cells[2]) && self.areCellsSameValue(c4, c6)) {
                if (self.areCellsWinnerReady(c4, c6)) {
                    availableWins.push(self.cells[2]);
                } else {
                    availableBlocks.push(self.cells[2]);
                }
            }

            if (availableWins.length > 0) {
                self.shuffle(availableWins);
                self.handleSelection(availableWins[0]);
            } else if (availableBlocks.length > 0) {
                self.shuffle(availableBlocks);
                self.handleSelection(availableBlocks[0]);
            } else {
                self.shuffle(availableCells);
                self.handleSelection(availableCells[0]);
            }
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
        self.blockUI = false;
        if (self.isXTurnAtStart === null) {
            self.isXTurnAtStart = true;
        } else {
            self.isXTurnAtStart = !self.isXTurnAtStart;
        }
        self.isXTurn = self.isXTurnAtStart;
        self.handleTurnMsg(self.isXTurnAtStart);
        self.cells.forEach((cell) => {
            cell.classList.remove("x");
            cell.classList.remove("o");
            cell.classList.remove("dim");
        });
        if ((self.isXTurn === true && self.isXAI === true) || (self.isXTurn === false && self.isOAI === true)) {
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
            } else if (this.isCellTaken(classes)) {
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
        if (self.isCellTaken(classes)) {
            return;
        }
        self.handleSelection(event.target);
    }

    playHumanVsHumanSound() {
        this.soundHumanVsHuman.play().catch(error => {
            //console.log('Playback failed:', error);
        });
    }

    playHumanVsAISound() {
        this.soundHumanVsAI.play().catch(error => {
            //console.log('Playback failed:', error);
        });
    }

    playAIVsHumanSound() {
        this.soundAIVsHuman.play().catch(error => {
            //console.log('Playback failed:', error);
        });
    }

    playAIVsAISound() {
        this.soundAIVsAI.play().catch(error => {
            //console.log('Playback failed:', error);
        });
    }

    playXSound() {
        this.soundX.play().catch(error => {
            //console.log('Playback failed:', error);
        });
    }

    playOSound() {
        this.soundO.play().catch(error => {
            //console.log('Playback failed:', error);
        });
    }

    playXWinsSound() {
        setTimeout(() => {
            this.soundXWins.play().catch(error => {
                //console.log('Playback failed:', error);
            });
        }, 200);
    }

    playOWinsSound() {
        setTimeout(() => {
            this.soundOWins.play().catch(error => {
                //console.log('Playback failed:', error);
            });
        }, 200);
    }

    playTieSound() {
        setTimeout(() => {
            this.soundTie.play().catch(error => {
                //console.log('Playback failed:', error);
            });
        }, 200);
    }

    handleSelection(selection) {
        const self = TicTacToe.instance;
        if (self.isXTurn === true) {
            self.playXSound();
            selection.classList.add("x");
        } else {
            self.playOSound();
            selection.classList.add("o");
        }
        self.processGame();
        self.isXTurn = !self.isXTurn;
    }

    processGame() {
        this.blockUI = true;
        const isNextTurnX = !this.isXTurn;

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
            if (this.areCellsTakenByPlayer(c0, c1, c2, player)) {
                winners.push(this.cells[0]);
                winners.push(this.cells[1]);
                winners.push(this.cells[2]);
            } else if (this.areCellsTakenByPlayer(c3, c4, c5, player)) {
                winners.push(this.cells[3]);
                winners.push(this.cells[4]);
                winners.push(this.cells[5]);
            } else if (this.areCellsTakenByPlayer(c6, c7, c8, player)) {
                winners.push(this.cells[6]);
                winners.push(this.cells[7]);
                winners.push(this.cells[8]);
            } else if (this.areCellsTakenByPlayer(c0, c3, c6, player)) {
                winners.push(this.cells[0]);
                winners.push(this.cells[3]);
                winners.push(this.cells[6]);
            } else if (this.areCellsTakenByPlayer(c1, c4, c7, player)) {
                winners.push(this.cells[1]);
                winners.push(this.cells[4]);
                winners.push(this.cells[7]);
            } else if (this.areCellsTakenByPlayer(c2, c5, c8, player)) {
                winners.push(this.cells[2]);
                winners.push(this.cells[5]);
                winners.push(this.cells[8]);
            } else if (this.areCellsTakenByPlayer(c0, c4, c8, player)) {
                winners.push(this.cells[0]);
                winners.push(this.cells[4]);
                winners.push(this.cells[8]);
            } else if (this.areCellsTakenByPlayer(c2, c4, c6, player)) {
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
            if (winner === "x") {
                this.playXWinsSound();
            } else {
                this.playOWinsSound();
            }
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
            this.timerInterval = setTimeout(this.clearCells, 1111);
            return;
        } else {
            // handle tie
            if (
                this.isCellTaken(c0) &&
                this.isCellTaken(c1) &&
                this.isCellTaken(c2) &&
                this.isCellTaken(c3) &&
                this.isCellTaken(c4) &&
                this.isCellTaken(c5) &&
                this.isCellTaken(c6) &&
                this.isCellTaken(c7) &&
                this.isCellTaken(c8)
            ) {
                this.playTieSound();
                this.setCount(this.tieCount, this.getCount(this.tieCount) + 1);
                this.setInfoMsg("Tie!");
                this.timerInterval = setTimeout(this.clearCells, 1111);
                return;
            } else {
                this.handleTurnMsg(isNextTurnX);
                const isAllCpuPlayers = this.isXAI === true && this.isOAI === true;
                const delay = isAllCpuPlayers === true ? 1111 : 777;
                if (isNextTurnX === true) {
                    if (this.isXAI === true) {
                        this.timerInterval = setTimeout(this.handleCPUTurn, delay);
                        return;
                    }
                } else {
                    if (this.isOAI === true) {
                        this.timerInterval = setTimeout(this.handleCPUTurn, delay);
                        return;
                    }
                }
            }
        }
        this.blockUI = false;
    }

    areCellsTakenByPlayer(cell1, cell2, cell3, player) {
        if (Array.isArray(cell1) === false || Array.isArray(cell2) === false || Array.isArray(cell3) === false) {
            throw "Argument must be an array";
        }
        return cell1.includes(player) && cell2.includes(player) && cell3.includes(player)
    }

    isCellTaken(cell) {
        if (Array.isArray(cell) === false) {
            throw "Argument must be an array";
        }
        return cell.includes("x") || cell.includes("o");
    }

    handleTurnMsg(paramIsXTurn) {
        if (paramIsXTurn === true) {
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

    getCount(element) {
        return parseInt(element.innerHTML);
    }

    destroy() {
        this.xDropdown.removeEventListener("change", this.reset);
        this.oDropdown.removeEventListener("change", this.reset);
        this.cells.forEach((cell) => {
            cell.removeEventListener("click", this.handleCellClick);
        });
        if (this.timerInterval) {
            clearTimeout(this.timerInterval);
        }
    }
}

const ttt = new TicTacToe();

window.onbeforeunload = function () {
    ttt.destroy();
}