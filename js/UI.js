<!--Designed, created and developed by Najim Mazidi-->
initBoardSquares();
addPiecesToGUI();
//SetSelectedSquare(3,3);
//DeselectSquare(3,3);
var userMoveTo="", userMoveFrom="";
function initBoardSquares(){
    var colour=1;
    for(i=0; i<8; i++) {
        for (j = 0; j < 8; j++) {
            if(colour==0){
                divstring="<div class=\"Square "+ "r" +(i+1) +" "+ "f" +(j+1)+" "+ "SquareDark" + "\"/>";
                $("#divBoard").append(divstring);
            }else {
                divstring = "<div class=\"Square " + "r" + (i+1) + " " + "f" +(j+1) + " " + "SquareLight" + "\"/>";
                $("#divBoard").append(divstring);
            }
            colour = 1 - colour;
        }
        colour = 1 - colour;
    }
}

function getFileName(piece){
    var fileName="";
    if (piece == piece.toUpperCase()) {
        fileName += "white";
    } else {
        fileName += "black";
    }
    if (piece == "P" || piece == "p") {
        fileName += "PAWN";
    } else if (piece == "K" || piece == "k") {
        fileName += "KING";
    } else if (piece == "Q" || piece == "q") {
        fileName += "QUEEN";
    } else if (piece == "R" || piece == "r") {
        fileName += "ROOK";
    } else if (piece == "N" || piece == "n") {
        fileName += "KNIGHT";
    } else if (piece == "B" || piece == "b") {
        fileName += "BISHOP";
    }
    fileName += ".png";
    return fileName;
}
function addPiecesToGUI(){
    var img, imgString;
    for(i=0; i<board.length; i++) {
        for (j = 0; j < board[i].length; j++) {
            if(board[i][j] != "/" && board[i][j] != " ") {
                img = getFileName(board[i][j]);
                imgString = "<image src=\"" + img + "\" class=\"Piece " + "r" + (i-1) + " " + "f" + (j-1) + "\"/>";
                $("#divBoard").append(imgString);
            }
        }
    }
}
function clearPieces(){
    $(".Piece").remove();
}
function SetSelectedSquare(i,j){ //sets a darker color to the square if it is clicked on
    $('.Square').each(function(index){

        if(board[i][j] != " " || board[i][j] != "/"){
            $(".r"+(i-1)+".f"+(j-1)).addClass('SquareSelected');
        }

    });
}
function DeselectSquare(i,j){
    $('.Square').each(function(index){
            $(".r"+(i+1)+".f"+(j+1)).removeClass('SquareSelected');

    });
}
function SquareClick(pageX,pageY){
    console.log('Clicked Square at' + pageX + ',' + pageY);
    var position = $('#divBoard').position();
    pageX= Math.floor(pageX);
    pageY= Math.floor(pageY);
    var rank=Math.floor((pageY-position.top)/60);
    var file=Math.floor((pageX-position.left)/60);
    console.log('Clicked square:' + rank + file);
    var square=""+rank+file;
    if(board[rank+2][file+2] == board[rank+2][file+2].toUpperCase()) {
        SetSelectedSquare(rank + 2, file + 2);
    }
    return square;
}
$(document).on('click','.Piece', function(e){
    console.log('Piece Click');
    if(userMoveFrom == "") {
        userMoveFrom = SquareClick(e.pageX, e.pageY);
    }else{
        userMoveTo = SquareClick(e.pageX, e.pageY);
        MakeUserMove();
    }
});
$(document).on('click','.Square', function(e){
    console.log('Square Click');
    if(userMoveFrom != "") {
        userMoveTo = SquareClick(e.pageX, e.pageY);
        MakeUserMove();
    }
});

function MakeUserMove(){
    var move="";
    var legalMoves = possibleMoves();
    var convertedMoveFrom = String(Number(userMoveFrom)+22);
    var convertedMoveTo = String(Number(userMoveTo)+22);
    if(board[Number(userMoveFrom.charAt(0))+2][Number(userMoveFrom.charAt(1))+2] == "P" && convertedMoveFrom.charAt(0) == "3"){
        move = convertedMoveFrom.charAt(1) + convertedMoveTo.charAt(1) + board[convertedMoveTo.charAt(0)][convertedMoveTo.charAt(1)] + "Q" + "P";
        console.log(move);
    }else{
        move="";
        move = "" + (Number(userMoveFrom)+22) + (Number(userMoveTo)+22) + board[Number(userMoveTo.charAt(0))+2][Number(userMoveTo.charAt(1))+2];
        console.log(move);
    }

    if (legalMoves.replace(move,"").length < legalMoves.length){
        makeUserMove(move);
        console.log(kingPositionW);
        clearPieces();
        addPiecesToGUI();
        DeselectSquare(Number(userMoveFrom.charAt(0)),Number(userMoveFrom.charAt(1)));
        DeselectSquare(Number(userMoveTo.charAt(0)),Number(userMoveTo.charAt(1)));
        userMoveFrom="";
        userMoveTo="";

    }else{
        DeselectSquare(Number(userMoveFrom.charAt(0)),Number(userMoveFrom.charAt(1)));
        DeselectSquare(Number(userMoveTo.charAt(0)),Number(userMoveTo.charAt(1)));
        userMoveFrom="";
        userMoveTo="";
    }
    legalMoves = "";
    possibleMoves();

}
