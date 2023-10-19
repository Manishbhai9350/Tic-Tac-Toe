const cell = document.querySelector(".cells");
const cells = document.querySelectorAll(".cell");

const player1 = document.querySelector(".player1-point");

const player2 = document.querySelector(".player2-point");
const drop = document.querySelector(".drop")

//const gameoversound = new Audio('/GAMES/Tic Tac Toe - GAME/sounds/gameover.mp3')
const resetBtn = document.querySelector(".restart");
const line = dc.qs('.line')
let player1_point = 0;
let player2_point = 0;

// CREATING VERIABLES
var currentPlayer = 'X';
var nextPlayer = 'O';
var move = currentPlayer;

const linerotate = [
    {
        top: '47px',
        left: '0px',
        rotate: '0deg'
    },
    {
        top: '147px',
        left: '0px',
        rotate: '0deg'
    },
    {
        top: '247px',
        left: '0px',
        rotate: '0deg'
    },
    {
        top: '150px',
        left: '-100px',
        rotate: '90deg'
    },
    {
        top: '150px',
        left: '0px',
        rotate: '90deg'
    },
    {
        top: '150px',
        left: '100px',
        rotate: '90deg'
    },
    {
        top: '147px',
        left: '0px',
        rotate: '45deg',
    },
    {
        top: '147px',
        left: '0px',
        rotate: '-45deg'
    }

]
const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
   ]

// FUNCTION TO ROTATE LINES 
function rotateline(index) {
    dc.log(index)
    line.style.display = "block";
    line.style.transform = `
    rotate(${linerotate[index].rotate})
    `
    line.style.top =
        `
    ${linerotate[index].top}
    `
    line.style.left =
        `
        ${linerotate[index].left}
        `
}
// FUNCTION TO SHOW ALERT 
const showAlert = (msg, time = 3000) => {
    drop.innerHTML = msg;
    drop.style =
        `
   transform: translateY(0);
   `
    setTimeout(() => {
        drop.style = "transform: translateY(-40px);"
    }, time)
}
// FUNCTION RO INCREASE POINTS 
const incresePoint = () => {
    if (move == currentPlayer) {
        player1_point++;
        let point = JSON.parse(localStorage.getItem("player1"));
        point++;
        localStorage.setItem("player1", JSON.stringify(point))
    }

    else

    {
        player2_point++;
        let point = JSON.parse(localStorage.getItem("player2"))
        point++;
        localStorage.setItem("player2", JSON.stringify(point))
    }

    showPoint();
}

// FUNCTION TO DISABLE CELLS PARENT
const disableCell = () => {
    cell.classList.add("disabled")
}

// FUNCTION TO SHOW POINTS FROM LOCAL STORAGE 
const showPoint = () => {
    if (localStorage.getItem("player1"))
    {
        player1.innerHTML =
            JSON.parse(localStorage.getItem("player1"));
    }
    if (localStorage.getItem("player2"))
    {
        player2.innerHTML =
            JSON.parse(localStorage.getItem("player2"));
    }
}
// FUNCTION TO CHECK WINNS
const checkWin = () => {

    for (var i = 0; i < wins.length; i++) {
        let [pos1, pos2, pos3] = wins[i];
        if (cells[pos1].textContent !== "" &&
            cells[pos1].textContent == cells[pos2].textContent && cells[pos1].textContent == cells[pos3].textContent &&
            cells[pos2].textContent == cells[pos3].textContent
        )
        {
            showAlert(`${move} WON`);
            cells[pos1].textContent == 'X' ? player1_point += 1 : player2_point += 1;
            incresePoint();
            showPoint();
            disableCell();
            rotateline(i)
            gameoversound.play()
            return true;
        }
    }
}

// FUNCTIONE TO CHANGE TURNS
const changeMove = () => {
    move = move == currentPlayer ? nextPlayer : currentPlayer;
    showAlert(`TURN FOR ${move}`, 1100)
}

//FUNCTION TO CLEAR ALL CELLS 
const clearAllcells = () => {
    cells.forEach(cell => {
        cell.textContent = "";
    })
}
// FUNCTION TO CHECK TIE 
const checkTie = () => {

    let emptyCount = 0;
    cells.forEach(cell => {
        if (cell.textContent === '') {
            emptyCount++;
        }
    })

    return emptyCount === 0 && !checkWin();
}
// BY DEFAULT START FUNCTION
const start = () => {
    showPoint();
    if (!localStorage.getItem("player1"))
    {
        localStorage.setItem("player1", JSON.stringify(player1_point))
    }
    if (!localStorage.getItem("player2"))
    {
        localStorage.setItem("player2", JSON.stringify(player2_point))
    }
    // CALLING THE CLEAR ALL CELL FUNCTION TO CLEAR ALL CELLS
    clearAllcells();
    // ADDING EVENT LISTNER TO ALL CELLS USING FOR EACH
    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
        //    dc.log('clicked')
                const click = new Audio('/GAMES/Tic Tac Toe - GAME/sounds/ting.mp3')
             // click.play()
         
            if (e.target.textContent == "") {
                e.target.textContent = `${move}`;
                checkWin();

                if (checkTie())
                {
                    showAlert("ITS A TIE")
                }
                else {
                    changeMove();
                }
            }

        })
    })



}

start();
resetBtn.addEventListener("click", () => {
    clearAllcells();
    start();
    cell.classList.remove("disabled")
    line.style =
        `
           display:none;
           `
})
showAlert(`TURN FOR ${move}`, 1100)