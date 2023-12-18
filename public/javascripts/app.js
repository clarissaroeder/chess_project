document.addEventListener("DOMContentLoaded", function() {
  // 0. Define player color:
  var playerColor = 'white';

  // 1a. Select all squares
  const squares = {};

  const allSquares = document.querySelectorAll('.square');
  allSquares.forEach((square) => {
    id = square.id;
    squares[id] = square;
  });

  // 1b. Attach click event listener to each square
  Object.values(squares).forEach(square => {
    // 1c. Inside event listener, call square selection function
    square.addEventListener('click', selectSquare)
  });

  // 2a. Define a variable to keep track of currently selected square
  let selectedSquare = null;

  // 2b. Define piece characteristic variables
  let selectedPiece = null;
  let pieceColor = null;
  let piecePosition = null;
  let pieceType = null;

  // 2c. Define piece presence variable
  let hasPiece;

  // 3a. selectSquare function:
  function selectSquare(event) {
    const clickedSquare = event.currentTarget;  // Understanding: currentTarget instead of target ensures selection of the parent div only
    const squareId = clickedSquare.id;

    // Check if a piece is already selected: if yes, this click represents the destination square
    if (selectedPiece) {

      // Move validation: while it returns false (not valid), exit selectSquare function temporarily.
      while (moveValid(selectedSquare, clickedSquare, pieceType, pieceColor, piecePosition, squareId) == false){    // Understanding: While this function is false, since the selectedSquare is not resetted, the next click should trigger this if statement again.
        return;
      }


      // When the move is validated, update HTML: get current square (parent element) THIS IS THE SAME AS "SELECTEDSQUARE" - CONSIDER CHANGING
      const currentSquare = selectedPiece.parentNode;

      // Remove piece from current square:
      currentSquare.removeChild(selectedPiece);

      // ADD A TAKING CONDITION: REMOVING THE OPPONENTS PIECE FROM SQUARE IF THERE IS ONE AND MOVE IT TO THE SIDE OF THE BOARD

      // Add piece to destination square:
      clickedSquare.appendChild(selectedPiece);

      // DEBUGGING:
      console.log("DEBUG SUCCESS: Piece moved")

      // Update piece position:
      piecePosition = squareId // Maybe useful later to store move history or sth

      // Reset piece characteristics and highlight:
      selectedSquare.classList.remove('highlight');
      selectedPiece = null;
      pieceColor = null;
      piecePosition = null;
      pieceType = null;

      return;   // Exit function after handling the move
    }

    // 2b. Check if square contains a piece:
    hasPiece = clickedSquare.innerHTML.trim() !== '';

    if (hasPiece){
      // 2c. If yes, remove highlights from any previously selected squares:
      if (selectedSquare !== null){
        selectedSquare.classList.remove('highlight');
      }

      // Add highlight to clicked square:
      clickedSquare.classList.add('highlight');

      // Store selected pieces information:
      selectedPiece = clickedSquare.querySelector('.chess-piece');
      pieceColor = selectedPiece.classList.contains('white') ? 'white' : 'black';   // Checks if a piece has class .white. If yes, colour is set to "white". If not, it is set to "black".
      piecePosition = squareId;
      pieceType = Array.from(selectedPiece.classList).find(className => className !== 'chess-piece' && className !== 'white' && className !== 'black');

      // Update currently selected square:
      selectedSquare = clickedSquare;

      // DEBUGGING:
      console.log("DEBUG SUCCESS: Square selected")
    }
  }
});