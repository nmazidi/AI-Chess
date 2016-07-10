<!--Designed, created and developed by Najim Mazidi-->
function totalRating(){
    var rating= 0;
    rating += materialRating();
    flipBoard();
    rating -= materialRating();
    flipBoard();
    return rating;
}
function materialRating(){
    var counter=0;
    for(i=0; i<board.length; i++){
        for(j=0; j<board[i].length; j++){
            if(board[i][j] == "P"){
                counter += 100;
            }else if(board[i][j] == "R"){
                counter += 500;
            }else if(board[i][j] == "B"){
                counter += 300;
            }else if(board[i][j] == "N"){
                counter += 300;
            }else if(board[i][j] == "Q"){
                counter += 900;
            }
        }
    }
    return counter;
}
function attackRating(){
    var counter=0;
    var tempKingPosition=[9,6];

    for(i=0; i<board.length; i++){
        for(j=0; j<board[i].length; j++){
            if(board[i][j] == "P"){
                kingPositionW=[i,j];
                if (isKingSafe() == false){
                    counter -= 64;
                }
            }else if(board[i][j] == "R"){
                kingPositionW=i;
                if (isKingSafe() == false){
                    counter -= 500;
                }
            }else if(board[i][j] == "B"){
                kingPositionW=i;
                if (isKingSafe() == false){
                    counter -= 300;
                }
            }else if(board[i][j] == "N"){
                kingPositionW=i;
                if (isKingSafe() == false){
                    counter -= 300;
                }
            }else if(board[i][j] == "Q"){
                kingPositionW=i;
                if (isKingSafe() == false){
                    counter -= 900;
                }
            }
        }
    }

    kingPositionW=tempKingPosition;
    if(isKingSafe() == false){
        counter -= 200;
    }
    return counter/2;
}
function movabilityRating(){
    var counter=0;
    counter += listLength; //1 move = 5 points
    if(listLength == 0){
        if(isKingSafe() == true){
            counter -= 150000; //stalemate
        }else{
            counter -= 200000; //checkmate
        }
    }
    return counter;
}