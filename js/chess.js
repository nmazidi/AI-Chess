<!--Designed, created and developed by Najim Mazidi-->
var board = [
    ["/","/","/","/","/","/","/","/","/","/","/","/"],
    ["/","/","/","/","/","/","/","/","/","/","/","/"],
    ["/","/","r","n","b","q","k","b","n","r","/","/"],
    ["/","/","p","p","p","p","p","p","p","p","/","/"],
    ["/","/"," "," "," "," "," "," "," "," ","/","/"],
    ["/","/"," "," "," "," "," "," "," "," ","/","/"],
    ["/","/"," "," "," "," "," "," "," "," ","/","/"],
    ["/","/"," "," "," "," "," "," "," "," ","/","/"],
    ["/","/","P","P","P","P","P","P","P","P","/","/"],
    ["/","/","R","N","B","Q","K","B","N","R","/","/"],
    ["/","/","/","/","/","/","/","/","/","/","/","/"],
    ["/","/","/","/","/","/","/","/","/","/","/","/"]];
var kingPositionW , kingPositionB;
kingPosW();
kingPosB();
//find king positions
function kingPosW() {
    for (q = 0; q < board.length; q++) {
        for (r = 0; r < board[q].length; r++) {
            if (board[q][r] == "K") {
                kingPositionW = [q, r];
            }
        }
    }
}
function kingPosB(){
    for (s = 0; s < board.length; s++) {
        for (t = 0; t < board[s].length; t++) {
            if (board[s][t] == "k") {
                kingPositionB = [s, t];
            }
        }
    }
}
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
function AI(){
    var rating=0, bestRating, move, bestMove="", list=possibleMoves();
    bestRating=totalRating();
    for(var count=0; count<list.length; count+=5){

        move=list.substring(count,count+5);
        makeAIMove(move);
        rating = totalRating();
        if (rating > bestRating){
            bestMove = list.substring(count,count+5);
            bestRating = rating;
        }
        undoAIMove(move);
    }

    if(bestMove==""){
        var num;
        num=5*Math.floor(Math.random()*(list.length/5));
        console.log(num);
        bestMove= list.substring(num,num+5);
        makeAIMove(bestMove);
    }else{
    console.log(bestMove);
    makeAIMove(bestMove);
    }
}
function makeUserMove(move){
    if(move.charAt(4) != "P"){
        //x1,y1,x2,y2,captured piece
        board[move.charAt(2)][move.charAt(3)] = board[move.charAt(0)][move.charAt(1)];
        board[move.charAt(0)][move.charAt(1)] = " ";
        if(board[move.charAt(2)][move.charAt(3)] == "K"){
            kingPosW();
        }
    }else{
        //if promotion move
        //column1, column2, captured piece, new piece, P
        board[3][move.charAt(0)] = " ";
        board[2][move.charAt(1)] = move.charAt(3);
    }
    flipBoard();
    AI();
    flipBoard();
}
function makeAIMove(move){
    if(move.charAt(4) != "P"){
        //x1,y1,x2,y2,captured piece
        board[move.charAt(2)][move.charAt(3)] = board[move.charAt(0)][move.charAt(1)];
        board[move.charAt(0)][move.charAt(1)] = " ";
        if(board[move.charAt(2)][move.charAt(3)] == "K"){
            kingPosW();
        }
    }else{
        //if promotion move
        //column1, column2, captured piece, new piece, P
        board[3][move.charAt(0)] = " ";
        board[2][move.charAt(1)] = move.charAt(3);
    }
}
function undoAIMove(move){
    if(move.charAt(4) != "P"){
        //x1,y1,x2,y2,captured piece
        board[move.charAt(0)][move.charAt(1)] = board[move.charAt(2)][move.charAt(3)];
        board[move.charAt(2)][move.charAt(3)] = move.charAt(4);
        if(board[move.charAt(0)][move.charAt(1)] == "K"){
            kingPosW();
        }
    }else{
        //if promotion move
        //column1, column2, captured piece, new piece, P
        board[3][move.charAt(0)] = "P";
        board[2][move.charAt(1)] = move.charAt(2);
    }
}
function possibleMoves() { //x1,y1,x2,y2,captured piece. e.g. 1234p represents file1, rank2 moves to file3, rank 4 and captures a black pawn
    var list;
    list="";
    for (i = 0; i < board.length; i++) {
        for (j = 0; j < board[i].length; j++) {
            if (board[i][j] == "P"){
                list += possiblePawn([i,j]); //returns list of moves for pawn at square 'count'
            }else if (board[i][j] == "R"){
                list += possibleRook([i,j]); //returns list of moves for pawn at square 'count'

            }else if (board[i][j] == "N"){
                list += possibleKnight([i,j]); //returns list of moves for pawn at square 'count'

            }else if (board[i][j] == "B"){
                list += possibleBishop([i,j]); //returns list of moves for pawn at square 'count'

            }else if (board[i][j] == "Q"){
                list += possibleQueen([i,j]); //returns list of moves for pawn at square 'count'

            }else if (board[i][j] == "K"){
                list += possibleKing([i,j]); //returns list of moves for pawn at square 'count'
            }
        }
    }
    return list; //all possible moves for all pieces
}
function possiblePawn(i){
    var list="",oldPiece,x=i[1];
    if(i[0] > 3) {
        //move one up
        if (board[i[0] - 1][x] == " ") {
            oldPiece = board[i[0] - 1][x];
            board[i] = " ";
            board[i[0] - 1][x] = "P";
            if (isKingSafe() == true) {
                list = list + i[0] + i[1] + (i[0] - 1) + (x) + oldPiece;
            }
            board[i] = "P";
            board[i[0] - 1][x] = oldPiece;
        }
        //move two up
        if (i[0] == 8) {
            if (board[i[0] - 2][x] == " " && board[i[0] - 1][x] == " ") {
                oldPiece = board[i[0] - 2][x];
                board[i] = " ";
                board[i[0] - 2][x] = "P";
                if (isKingSafe() == true) {
                    list = list + i[0] + i[1] + (i[0] - 2) + (x) + oldPiece;
                }
                board[i] = "P";
                board[i[0] - 2  ][x] = oldPiece;
            }
        }
        //capture
        if (board[i[0] - 1][x - 1] == board[i[0] - 1][x - 1].toLowerCase() && board[i[0] - 1][x - 1] != " " && board[i[0] - 1][x - 1] != "/") {
            oldPiece = board[i[0] - 1][x - 1];
            board[i] = " ";
            board[i[0] - 1][x - 1] = "P";
            if (isKingSafe() == true) {
                list = list + i[0] + i[1] + (i[0] - 1) + (x - 1) + oldPiece;
            }
            board[i] = "P";
            board[i[0] - 1][x - 1] = oldPiece;
        }
        if (board[i[0] - 1][x + 1] == board[i[0] - 1][x + 1].toLowerCase() && board[i[0] - 1][x + 1] != " " && board[i[0] - 1][x + 1] != "/") {
            oldPiece = board[i[0] - 1][x + 1];
            board[i] = " ";
            board[i[0] - 1][x + 1] = "P";
            if (isKingSafe() == true) {
                list = list + i[0] + i[1] + (i[0] - 1) + (x + 1) + oldPiece;
            }
            board[i] = "P";
            board[i[0] - 1][x + 1] = oldPiece;
        }
    }else if(i[0]=3){
        //promotion
        if (board[i[0] - 1][x] == " ") {
            var temp = ["Q","R","B","K"];
            for(p=0;p<4;p++) {
                oldPiece = board[i[0] - 1][x];
                board[i] = " ";
                board[i[0] - 1][x] = temp[p];
                if (isKingSafe() == true) {
                    //column1, column2, captured piece, new piece, P
                    list = list + i[1] + i[1] + oldPiece + temp[p] + "P";
                }
                board[i] = "P";
                board[i[0] - 1][x] = oldPiece;
            }
        }
        //capture and promotion
        if (board[i[0] - 1][x - 1] == board[i[0] - 1][x - 1].toLowerCase() && board[i[0] - 1][x - 1] != " " && board[i[0] - 1][x - 1] != "/") {
            temp = ["Q","R","B","K"];
            for(p=0;p<4;p++) {
                oldPiece = board[i[0] - 1][x - 1];
                board[i] = " ";
                board[i[0] - 1][x - 1] = temp[p];
                if (isKingSafe() == true) {
                    //column1, column2, captured piece, new piece, P
                    list = list + i[1] + (x-1) + oldPiece + temp[p] + "P";
                }
                board[i] = "P";
                board[i[0] - 1][x - 1] = oldPiece;
            }
        }
        //capture and promotion
        if (board[i[0] - 1][x + 1] == board[i[0] - 1][x + 1].toLowerCase() && board[i[0] - 1][x + 1] != " " && board[i[0] - 1][x + 1] != "/") {
                temp = ["Q","R","B","K"];
                for(p=0;p<4;p++) {
                    oldPiece = board[i[0] - 1][x + 1];
                    board[i] = " ";
                    board[i[0] - 1][x + 1] = temp[p];
                    if (isKingSafe() == true) {
                        list = list + i[1] + (x+1) + oldPiece + temp[p] + "P";
                    }
                    board[i] = "P";
                    board[i[0] - 1][x + 1] = oldPiece;
                }
            }

    }
        return list;
}
function possibleRook(i){
    var list="",oldPiece,temp=0;
    for(y=(i[0]-1); y<=(i[0]+1); y++) {
        for (x=(i[1]-1); x <= (i[1]+1); x++) {

            if (y<i[0] && x==i[1]){
                    temp=0;
                    while (board[y - temp][x] == " ") {
                        oldPiece = board[y - temp][x];
                        board[i] = " ";
                        board[y - temp][x] = "R";
                        if (isKingSafe() == true) {
                            list = list + i[0] + i[1] + (y - temp) + (x) + oldPiece;
                        }
                        board[i] = "R";
                        board[y - temp][x] = oldPiece;
                        temp++;
                    }
                    if (board[y-temp][x] == board[y-temp][x].toLowerCase() && board[y-temp][x] != "/"){
                        oldPiece = board[y-temp][x];
                        board[i] = " ";
                        board[y-temp][x] = "R";
                        if (isKingSafe() == true) {
                            list = list + i[0] + i[1] + (y - temp) + (x) + oldPiece;
                        }
                        board[i] = "R";
                        board[y-temp][x] = oldPiece;
                        temp++;
                    }
            }else if (y>i[0] && x==i[1]){
                    temp = 0;
                    while (board[y + temp][x] == " ") {
                        oldPiece = board[y + temp][x];
                        board[i] = " ";
                        board[y + temp][x] = "R";
                        if (isKingSafe() == true) {
                            list = list + i[0] + i[1] + (y + temp) + (x) + oldPiece;
                        }
                        board[i] = "R";
                        board[y + temp][x] = oldPiece;
                        temp++;
                    }
                    if (board[y+temp][x] == board[y+temp][x].toLowerCase() && board[y+temp][x] != "/"){
                        oldPiece = board[y+temp][x];
                        board[i] = " ";
                        board[y+temp][x] = "R";
                        if (isKingSafe() == true) {
                            list = list + i[0] + i[1] + (y + temp) + (x) + oldPiece;
                        }
                        board[i] = "R";
                        board[y+temp][x] = oldPiece;
                        temp++;
                    }
            }else if (y==i[0]){
                    if (x < i[1]) {
                        temp = 0;
                        while (board[y][x - temp] == " ") {
                            oldPiece = board[y][x - temp];
                            board[i] = " ";
                            board[y][x - temp] = "R";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y) + (x - temp) + oldPiece;
                            }
                            board[i] = "R";
                            board[y][x - temp] = oldPiece;
                            temp++;
                        }
                        if (board[y][x-temp] == board[y][x-temp].toLowerCase() && board[y][x - temp] != "/") {

                            oldPiece = board[y][x-temp];
                            board[i] = " ";
                            board[y][x-temp] = "R";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y) + (x - temp) + oldPiece;
                            }
                            board[i] = "R";
                            board[y][x - temp] = oldPiece;
                            temp++;
                        }
                    } else if (x > i[1]) {
                        temp = 0;
                        while (board[y][x + temp] == " ") {
                            oldPiece = board[y][x + temp];
                            board[i] = " ";
                            board[y][x + temp] = "R";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y) + (x + temp) + oldPiece;
                            }
                            board[i] = "R";
                            board[y][x + temp] = oldPiece;
                            temp++;
                        }
                        if (board[y][x + temp] == board[y][x + temp].toLowerCase() && board[y][x + temp] != "/") {
                            oldPiece = board[y][x + temp];
                            board[i] = " ";
                            board[y][x + temp] = "R";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y) + (x + temp) + oldPiece;
                            }
                            board[i] = "R";
                            board[y][x + temp] = oldPiece;
                            temp++;
                        }
                    }
            }
        }
    }
    return list;
}
function possibleKnight(i){
    var list="",oldPiece;
    for(y=(i[0]-1); y<=(i[0]+1); y+=2) {
        for (x = (i[1]-1); x <= (i[1]+1); x+=2) {

                if (y < i[0]) {
                    if (x < i[1]) {
                        if (board[y - 1][x] == " " || board[y-1][x] == board[y-1][x].toLowerCase() && board[y-1][x] != "/") {
                            oldPiece = board[y - 1][x];
                            board[i] = " ";
                            board[y - 1][x] = "N";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y - 1) + (x) + oldPiece;
                            }
                            board[i] = "N";
                            board[y - 1][x] = oldPiece;
                        }
                        if (board[y][x-1] == " " || board[y][x-1] == board[y][x-1].toLowerCase() && board[y][x-1] != "/") {
                         oldPiece = board[y][x-1];
                         board[i] = " ";
                         board[y][x-1] = "N";
                         if (isKingSafe() == true) {
                         list = list + i[0] + i[1] + (y) + (x-1) + oldPiece;
                         }
                         board[i] = "N";
                         board[y][x-1] = oldPiece;
                         }
                    } else if (x > i[1]) {
                        if (board[y - 1][x] == " " || board[y-1][x] == board[y-1][x].toLowerCase() && board[y-1][x] != "/") {
                            oldPiece = board[y - 1][x];
                            board[i] = " ";
                            board[y - 1][x] = "N";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y - 1) + (x) + oldPiece;
                            }
                            board[i] = "N";
                            board[y - 1][x] = oldPiece;
                        }
                        if (board[y][x + 1] == " " || board[y][x+1] == board[y][x+1].toLowerCase() && board[y][x+1] != "/") {
                            oldPiece = board[y][x + 1];
                            board[i] = " ";
                            board[y][x + 1] = "N";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y) + (x + 1) + oldPiece;
                            }
                            board[i] = "N";
                            board[y][x + 1] = oldPiece;
                        }
                    }
                } else if (y > i[0]) {
                    if (x < i[1]) {
                        if (board[y + 1][x] == " " || board[y+1][x] == board[y+1][x].toLowerCase() && board[y+1][x] != "/") {
                            oldPiece = board[y + 1][x];
                            board[i] = " ";
                            board[y + 1][x] = "N";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y + 1) + (x) + oldPiece;
                            }
                            board[i] = "N";
                            board[y + 1][x] = oldPiece;
                        }
                        if (board[y][x - 1] == " " || board[y][x-1] == board[y][x-1].toLowerCase() && board[y][x-1] != "/") {
                            oldPiece = board[y][x - 1];
                            board[i] = " ";
                            board[y][x - 1] = "N";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y) + (x - 1) + oldPiece;
                            }
                            board[i] = "N";
                            board[y][x - 1] = oldPiece;
                        }
                    } else if (x > i[1]) {
                        if (board[y + 1][x] == " " || board[y+1][x] == board[y+1][x].toLowerCase() && board[y+1][x] != "/") {
                            oldPiece = board[y + 1][x];
                            board[i] = " ";
                            board[y + 1][x] = "N";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y + 1) + (x) + oldPiece;
                            }
                            board[i] = "N";
                            board[y + 1][x] = oldPiece;
                            if (board[y][x + 1] == " " || board[y][x+1] == board[y][x+1].toLowerCase() && board[y][x+1] != "/") {
                                oldPiece = board[y][x + 1];
                                board[i] = " ";
                                board[y][x + 1] = "N";
                                if (isKingSafe() == true) {
                                    list = list + i[0] + i[1] + (y) + (x + 1) + oldPiece;
                                }
                                board[i] = "N";
                                board[y][x + 1] = oldPiece;
                            }
                        }
                    }
                }
        }
    }

    return list;
}
function possibleBishop(i){
    var list="",oldPiece,temp=0;
    for(y=(i[0]-1); y<=(i[0]+1); y+=2) {
        for (x = (i[1]-1); x <= (i[1]+1); x+=2) {
                if (y < i[0]) {
                    if (x < i[1]) {
                        temp = 0;
                        while (board[y - temp][x - temp] == " ") {
                            oldPiece = board[y - temp][x - temp];
                            board[i] = " ";
                            board[y - temp][x - temp] = "B";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y - temp) + (x - temp) + oldPiece;
                            }
                            board[i] = "B";
                            board[y - temp][x - temp] = oldPiece;
                            temp++;
                        }
                        if (board[y - temp][x - temp] == board[y - temp][x - temp].toLowerCase() && board[y - temp][x - temp] != "/") {
                            oldPiece = board[y - temp][x - temp];
                            board[i] = " ";
                            board[y - temp][x - temp] = "B";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y - temp) + (x - temp) + oldPiece;
                            }
                            board[i] = "B";
                            board[y - temp][x - temp] = oldPiece;
                            temp++;
                        }
                    } else if (x > i[1]) {
                        temp = 0;
                        while (board[y - temp][x + temp] == " ") {
                            oldPiece = board[y - temp][x + temp];
                            board[i] = " ";
                            board[y - temp][x + temp] = "B";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y - temp) + (x + temp) + oldPiece;
                            }
                            board[i] = "B";
                            board[y - temp][x + temp] = oldPiece;
                            temp++;
                        }
                        if (board[y - temp][x + temp] == board[y - temp][x + temp].toLowerCase() && board[y - temp][x + temp] != "/") {
                            oldPiece = board[y - temp][x + temp];
                            board[i] = " ";
                            board[y - temp][x + temp] = "B";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y - temp) + (x + temp) + oldPiece;
                            }
                            board[i] = "B";
                            board[y - temp][x + temp] = oldPiece;
                            temp++;
                        }
                    }
                } else if (y > i[0]) {
                    if (x < i[1]) {
                        temp = 0;
                        while (board[y + temp][x - temp] == " ") {
                            oldPiece = board[y + temp][x - temp];
                            board[i] = " ";
                            board[y + temp][x - temp] = "B";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y + temp) + (x - temp) + oldPiece;
                            }
                            board[i] = "B";
                            board[y + temp][x - temp] = oldPiece;
                            temp++;
                        }
                        if (board[y + temp][x - temp] == board[y + temp][x - temp].toLowerCase() && board[y + temp][x - temp] != "/") {
                            oldPiece = board[y + temp][x - temp];
                            board[i] = " ";
                            board[y + temp][x - temp] = "B";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y + temp) + (x - temp) + oldPiece;
                            }
                            board[i] = "B";
                            board[y + temp][x - temp] = oldPiece;
                            temp++;
                        }
                    } else if (x > i[1]) {
                        temp = 0;

                        while (board[y + temp][x + temp] == " ") {
                            oldPiece = board[y + temp][x + temp];
                            board[i] = " ";
                            board[y + temp][x + temp] = "B";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y + temp) + (x + temp) + oldPiece;
                            }
                            board[i] = "B";
                            board[y + temp][x + temp] = oldPiece;
                            temp++;
                        }
                        if (board[y + temp][x + temp] == board[y + temp][x + temp].toLowerCase()) {
                            if (board[y + temp][x + temp] != "/") {
                                oldPiece = board[y + temp][x + temp];
                                board[i] = " ";
                                board[y + temp][x + temp] = "B";
                                if (isKingSafe() == true) {
                                    list = list + i[0] + i[1] + (y + temp) + (x + temp) + oldPiece;
                                }
                                board[i] = "B";
                                board[y + temp][x + temp] = oldPiece;
                                temp++;
                            }
                        }

                    }
                }
        }
    }

    return list;
}
function possibleQueen(i){
    var list="",oldPiece,temp=0;
    for(y=(i[0]-1); y<=(i[0]+1); y++) {
        for (x = (i[1]-1); x <= (i[1]+1); x++) {
                if (y < i[0]) {
                    if (x < i[1]) {
                        temp = 0;
                        while (board[y - temp][x - temp] == " ") {
                            oldPiece = board[y - temp][x - temp];
                            board[i] = " ";
                            board[y - temp][x - temp] = "Q";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y - temp) + (x - temp) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y - temp][x - temp] = oldPiece;
                            temp++;
                        }
                        if (board[y - temp][x - temp] == board[y - temp][x - temp].toLowerCase() && board[y - temp][x - temp] != "/") {
                            oldPiece = board[y - temp][x - temp];
                            board[i] = " ";
                            board[y - temp][x - temp] = "Q";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y - temp) + (x - temp) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y - temp][x - temp] = oldPiece;
                            temp++;
                        }
                    } else if (x > i[1]) {
                        temp = 0;
                        while (board[y - temp][x + temp] == " ") {
                            oldPiece = board[y - temp][x + temp];
                            board[i] = " ";
                            board[y - temp][x + temp] = "Q";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y - temp) + (x + temp) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y - temp][x + temp] = oldPiece;
                            temp++;
                        }
                        if (board[y - temp][x + temp] == board[y - temp][x + temp].toLowerCase() && board[y - temp][x + temp] != "/") {
                            oldPiece = board[y - temp][x + temp];
                            board[i] = " ";
                            board[y - temp][x + temp] = "Q";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y - temp) + (x + temp) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y - temp][x + temp] = oldPiece;
                            temp++;
                        }
                    } else if (x == i[1]) {
                        temp = 0;
                        while (board[y - temp][x] == " ") {
                            oldPiece = board[y - temp][x];
                            board[i] = " ";
                            board[y - temp][x] = "Q";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y - temp) + (x) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y - temp][x] = oldPiece;
                            temp++;
                        }
                        if (board[y - temp][x] == board[y - temp][x].toLowerCase() && board[y - temp][x] != "/") {
                            oldPiece = board[y - temp][x];
                            board[i] = " ";
                            board[y - temp][x] = "Q";
                              if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y - temp) + (x) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y - temp][x] = oldPiece;
                            temp++;
                        }
                    }
                } else if (y > i[0]) {
                    if (x < i[1]) {
                        temp = 0;
                        while (board[y + temp][x - temp] == " ") {
                            oldPiece = board[y + temp][x - temp];
                            board[i] = " ";
                            board[y + temp][x - temp] = "Q";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y + temp) + (x - temp) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y + temp][x - temp] = oldPiece;
                            temp++;
                        }
                        if (board[y + temp][x - temp] == board[y + temp][x - temp].toLowerCase() && board[y + temp][x - temp] != "/") {
                            oldPiece = board[y + temp][x - temp];
                            board[i] = " ";
                            board[y + temp][x - temp] = "Q";
                              if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y + temp) + (x - temp) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y + temp][x - temp] = oldPiece;
                            temp++;
                        }
                    } else if (x > i[1]) {
                        temp = 0;
                        while (board[y + temp][x + temp] == " ") {
                            oldPiece = board[y + temp][x + temp];
                            board[i] = " ";
                            board[y + temp][x + temp] = "Q";
                              if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y + temp) + (x + temp) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y + temp][x + temp] = oldPiece;
                            temp++;
                        }
                        if (board[y + temp][x + temp] == board[y + temp][x + temp].toLowerCase() && board[y + temp][x + temp] != "/") {
                            oldPiece = board[y + temp][x + temp];
                            board[i] = " ";
                            board[y + temp][x + temp] = "Q";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y + temp) + (x + temp) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y + temp][x + temp] = oldPiece;
                            temp++;
                        }
                    } else if (x == i[1]) {
                        temp = 0;
                        while (board[y + temp][x] == " ") {
                            oldPiece = board[y + temp][x];
                            board[i] = " ";
                            board[y + temp][x] = "Q";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y + temp) + (x) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y + temp][x] = oldPiece;
                            temp++;
                        }
                        if (board[y + temp][x] == board[y + temp][x].toLowerCase() && board[y + temp][x] != "/") {
                            oldPiece = board[y + temp][x];
                            board[i] = " ";
                            board[y + temp][x] = "Q";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y + temp) + (x) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y + temp][x] = oldPiece;
                            temp++;
                        }
                    }
                } else if (y == i[0]) {
                    if (x < i[1]) {
                        temp = 0;
                        while (board[y][x - temp] == " ") {
                            oldPiece = board[y][x - temp];
                            board[i] = " ";
                            board[y][x - temp] = "Q";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y) + (x - temp) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y][x - temp] = oldPiece;
                            temp++;
                        }
                        if (board[y][x - temp] == board[y][x - temp].toLowerCase() && board[y][x - temp] != "/") {
                            oldPiece = board[y][x - temp];
                            board[i] = " ";
                            board[y][x - temp] = "Q";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y) + (x - temp) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y][x - temp] = oldPiece;
                            temp++;
                        }
                    } else if (x > i[1]) {
                        temp = 0;
                        while (board[y][x + temp] == " ") {
                            oldPiece = board[y][x + temp];
                            board[i] = " ";
                            board[y][x + temp] = "Q";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y) + (x + temp) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y][x + temp] = oldPiece;
                            temp++;
                        }
                        if (board[y][x + temp] == board[y][x + temp].toLowerCase() && board[y][x + temp] != "/") {
                            oldPiece = board[y][x + temp];
                            board[i] = " ";
                            board[y][x + temp] = "Q";
                            if (isKingSafe() == true) {
                                list = list + i[0] + i[1] + (y) + (x + temp) + oldPiece;
                            }
                            board[i] = "Q";
                            board[y][x + temp] = oldPiece;
                            temp++;
                        }
                    }
                }
        }
    }

    return list;
}
function possibleKing(i){

    var list="", oldPiece;
    kingPosW();
        for(y=(i[0]-1);y<=(i[0]+1);y++) { //cycle through all the squares that king can move to
            for (x = (i[1] - 1); x <= (i[1] + 1); x++) {
                    if (y != i[0] || x != i[1]) { //skip own square
                        if (board[y][x] != "/") {
                            if (board[y][x] == " " || board[y][x] == board[y][x].toLowerCase()) {
                                oldPiece = board[y][x];
                                board[i] = oldPiece;
                                board[y][x] = "K";
                                var kingtemp = kingPositionW;
                                kingPositionW = [y,x];
                                if (isKingSafe() == true) {
                                    list = list + i[0] + i[1] + y + x + oldPiece;
                                }
                                board[i] = "K";
                                board[y][x] = oldPiece;
                                kingPositionW = kingtemp;
                            }
                        }
                    }
            }
        }
    return list;
}
function flipBoard(){
    var count,temp;
    for (i = 2; i < 10; i++) {
        for (j = 2; j < 10; j++) {
            if(board[i][j] == board[i][j].toUpperCase()){
                board[i][j] = board[i][j].toLowerCase()
            }else{
                board[i][j] = board[i][j].toUpperCase()
            }
        }
    }
    for (k=0; k<6;k++){
        for (l=0; l<12; l++){
            temp = board[k][l];
            board[k][l] = board[11-k][11-l];
            board[11-k][11-l] = temp;
        }
    }
}
function isKingSafe(){
    var count=0;

    for(c=(kingPositionW[0]-1); c<=(kingPositionW[0]+1); c++) {
        for (r = (kingPositionW[1]-1); r <= (kingPositionW[1]+1); r++) {

                if (c < kingPositionW[0]) {
                    if (r < kingPositionW[1]) {
                        count = 0;
                        while (board[c - count][r - count] == " ") {
                            count++;
                        }
                        if (board[c - count][r - count] == "b" || board[c - count][r - count] == "q") {
                            return false;
                        }
                        if (board[c][r] == "p" || board[c][r] == "k"){
                            return false;
                        }
                    } else if (r > kingPositionW[1]) {
                        count = 0;
                        while (board[c - count][r + count] == " ") {
                            count++;
                        }
                        if (board[c - count][r + count] == "b" || board[c - count][r + count] == "q") {
                            return false;
                        }
                        if (board[c][r] == "p" || board[c][r] == "k"){
                            return false;
                        }
                    } else if (r == kingPositionW[1]) {
                        count = 0;
                        while (board[c - count][r] == " ") {
                            count++;
                        }
                        if (board[c - count][r] == "r" || board[c - count][r] == "q") {
                            return false;
                        }
                        if (board[c][r] == "k"){
                            return false;
                        }
                    }
                } else if (c > kingPositionW[0]) {
                    if (r < kingPositionW[1]) {
                        count = 0;
                        while (board[c + count][r - count] == " ") {
                            count++;
                        }
                        if (board[c + count][r - count] == "b" || board[c + count][r - count] == "q") {
                            return false;
                        }
                        if (board[c][r] == "k"){
                            return false;
                        }
                    } else if (r > kingPositionW[1]) {
                        count = 0;
                        while (board[c + count][r + count] == " ") {
                            count++;
                        }
                        if (board[c + count][r + count] == "b" || board[c + count][r + count] == "q") {
                            return false;
                        }
                        if (board[c][r] == "k"){
                            return false;
                        }
                    } else if (r == kingPositionW[1]) {
                        count = 0;
                        while (board[c + count][r] == " ") {
                            count++;
                        }
                        if (board[c + count][r] == "r" || board[c + count][r] == "q") {
                            return false;
                        }
                        if (board[c][r] == "k"){
                            return false;
                        }
                    }
                } else if (c == kingPositionW[0]) {
                    if (r < kingPositionW[1]) {
                        count = 0;
                        while (board[c][r - count] == " ") {
                            count++;
                        }
                        if (board[c][r - count] == "r" || board[c][r - count] == "q") {
                            return false;
                        }
                        if (board[c][r] == "k"){
                            return false;
                        }
                    } else if (r > kingPositionW[1]) {
                        count = 0;
                        while (board[c][r + count] == " ") {
                            count++;
                        }
                        if (board[c][r + count] == "r" || board[c][r + count] == "q") {
                            return false;
                        }
                        if (board[c][r] == "k"){
                            return false;
                        }
                    }
                }
        }
    }
    return true;

}
