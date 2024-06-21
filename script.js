const boxes=document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//to initialize the game
function initGame()
{
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    //UI PE BHI EMPTY KARNA HOga
    boxes.forEach((box,index)=>{
        boxes.innerText="";
        boxes[index].style.pointerEvents="all";
        //green ko bhi hatana hoga naa so sbko fir se intialize kar denge
        box.classList=`box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`; 
}

function checkGameOver()
{
    let answer="";
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" ||gameGrid[position[2]]!=="" )&& (gameGrid[position[0]]===gameGrid[position[1]])&& (gameGrid[position[1]]===gameGrid[position[2]]))
        {
            if(gameGrid[position[0]]==="X")
            {
                answer="X";
            }
            else{
                answer="O";
            }

            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer!=="")
    {
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //to check if it is tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=="")
            fillCount++;
    });


    if(fillCount===9)
    {
        gameInfo.innerText="Game Tied";
        newGameBtn.classList.add("active");
    }


}



function handelClick(index){
    if(gameGrid[index]==="")
    {
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap karo turn ko
        swapTurn();
        //check karo koi jeet toh nhi gya
        checkGameOver(); 
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handelClick(index);
    })
}); 

newGameBtn.addEventListener("click",initGame);