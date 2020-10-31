window.addEventListener("DOMContentLoaded", event => {
    
    const key = 'tic-tac-toe-game-state';
    const board = document.getElementById("tic-tac-toe-board");
    const squareValues = ['', '', '', '', '', '', '', '', ''];
    let currentPlayerSymbol = "x";
    let gameStatus = "";
    

    //track the clicks of the players and fill the grid with the appropriate symbols.
    
    board.addEventListener("click", event => {

        const targetId = event.target.id;

        let grid = document.getElementById(targetId);
        let index = Number.parseInt(targetId[targetId.length - 1]);

        if (squareValues[index] !== "") return;

        const img = document.createElement("img");
        img.setAttribute("src", `./player-${currentPlayerSymbol}.svg`);

        squareValues[index] = currentPlayerSymbol;

        grid.appendChild(img);

       if (currentPlayerSymbol === "x"){
           currentPlayerSymbol = "o";
       } else {
           currentPlayerSymbol = "x";
       }
       checkGameStatus();
    })
    
    const checkGameStatus = function(){
        // check rows:
        for (let i = 0; i < 9; i += 3){
            if (squareValues[i] !== "" 
                && squareValues[i] === squareValues[i + 1] 
                && squareValues[i + 1] === squareValues[i + 2]){
              gameStatus = squareValues[i].toUpperCase();
              break;
       
            } 
        }

        //check colums:
        for (let i = 0; i < 3; i += 1){
            if (squareValues[i] !== "" 
                && squareValues[i] === squareValues[i + 3] 
                && squareValues[i + 3] === squareValues[i + 6]){
              gameStatus = squareValues[i].toUpperCase();
              break;
            }
        }
        
        // check diagonals:
        if (squareValues[0] !== "" 
            && squareValues[0] === squareValues[4] 
            && squareValues[4] === squareValues[8]) {
          gameStatus = squareValues[0].toUpperCase();
          
        }
        
        if (squareValues[2] !== "" 
            && squareValues[2] === squareValues[4] 
            && squareValues[2] === squareValues[6]) {
          gameStatus = squareValues[2].toUpperCase();
          
        } 

        //check for a tie:
        let boardIsFilled = true;
        for (let i = 0; i < 9; i ++){
            if (squareValues[i] === ""){
                boardIsFilled = false;
                break;
            }
        }
        if (boardIsFilled){
            gameStatus = 'None';
        }

        if (gameStatus !== ""){
            document.getElementById('game-status').innerHTML = "Winner: " + gameStatus;
            document.getElementById("new-game").disabled = false;
        }
    }
    
    document
      .getElementById("new-game")
      .addEventListener('click', event => {
         gameStatus = "";
         document.getElementById("game-status").innerHTML = "";
         for ( let i = 0; i < 9; i += 1) {
             document
               .getElementById(`square-${i}`)
               .innerHTML = "";
         }
         currentPlayerSymbol = "x";
         document
           .getElementById("new-game")
           .disabled = true;
         squareValues = ['', '', '', '', '', '', '', '', ''];
         document
            .getElementById('give-up')
            .disabled = false;  
      });

      document
        .getElementById("give-up")
        .addEventListener("click", () => {
            if (currentPlayerSymbol === 'x'){
                gameStatus = 'o';
            } else {
                gameStatus = 'x';
            }
         document
            .getElementById('game-status')
            .innerHTML = "Winner: " + gameStatus;

         document
            .getElementById("give-up")
            .disabled = true;

         document
            .getElementById("new-game")
            .disabled = false;   

        })

});