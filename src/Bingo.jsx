
{
// Define win conditions
const winConditions = {
    // Vertical
    vertical1: ['c6', 'c7', 'c8', 'c9', 'c10'],
    vertical2: ['c11', 'c12', 'c13', 'c14', 'c15'],
    vertical3: ['c16', 'c17', 'c18', 'c19', 'c20'],
    vertical4: ['c21', 'c22', 'c23', 'c24', 'c25'],
    vertical5: ['c26', 'c27', 'c28', 'c29', 'c30'],
  
    // Horizontal
    horizontal1: ['c6', 'c11', 'c16', 'c21', 'c26'],
    horizontal2: ['c7', 'c12', 'c17', 'c22', 'c27'],
    horizontal3: ['c8', 'c13', 'c18', 'c23', 'c28'],
    horizontal4: ['c9', 'c14', 'c19', 'c24', 'c29'],
    horizontal5: ['c10', 'c15', 'c20', 'c25', 'c30'],
  
    // Diagonal
    diagonal1: ['c6', 'c12', 'c18', 'c24', 'c30'],
    diagonal2: ['c10', 'c14', 'c18', 'c22', 'c26']
  };
  
  // Function to generate unique numbers
  function generateUniqueNumbers(count, min, max) {
    if (count > (max - min + 1)) {
      throw new Error('Cannot generate more unique numbers than the range allows');
    }
  
    let uniqueNumbers = [];
    while (uniqueNumbers.length < count) {
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!uniqueNumbers.includes(randomNumber)) {
        uniqueNumbers.push(randomNumber);
      }
    }
  
    return uniqueNumbers;
  }
  
  // Generate values for bingo card
  const bvalues = generateUniqueNumbers(5, 1, 15);
  const ivalues = generateUniqueNumbers(5, 16, 30);
  const nvalues = generateUniqueNumbers(4, 31, 45);
  const gvalues = generateUniqueNumbers(5, 46, 60);
  const ovalues = generateUniqueNumbers(5, 61, 75);
  
  // Insert values into the bingo card
  function populateCard() {
    // Insert values into B
    for (let i = 0; i < bvalues.length; i++) {
      let elementId = 'c' + (5 * (i + 1) + 1);
      document.getElementById(elementId).innerHTML = bvalues[i];
    }
    // Insert values into I
    for (let i = 0; i < ivalues.length; i++) {
      let elementId = 'c' + (5 * (i + 1) + 2);
      document.getElementById(elementId).innerHTML = ivalues[i];
    }
    // Insert values into N
    for (let i = 0; i < nvalues.length; i++) {
      let elementId = (i < 2) ? 'c' + (5 * (i + 1) + 3) : 'c' + (5 * (i + 1) + 8);
      document.getElementById(elementId).innerHTML = nvalues[i];
    }
    // Insert values into G
    for (let i = 0; i < gvalues.length; i++) {
      let elementId = 'c' + (5 * (i + 1) + 4);
      document.getElementById(elementId).innerHTML = gvalues[i];
    }
    // Insert values into O
    for (let i = 0; i < ovalues.length; i++) {
      let elementId = 'c' + (5 * (i + 1) + 5);
      document.getElementById(elementId).innerHTML = ovalues[i];
    }
  }
  populateCard();
  
 // Array to track selected cells
let clickedElements = ['c18'];
//Array to track selected numbers
let clickedNumbers = ['Free'];

// Click handler for cells
function handleClick(event) {
  let elementId = event.target.id;
  let cellContent = event.target.textContent.trim(); // Ensure textContent is properly retrieved

  if (!clickedElements.includes(elementId)) {
    // Add the cell to the list of clicked elements
    clickedElements.push(elementId);
    clickedNumbers.push(cellContent); // Add the content to clickedNos
    event.target.classList.add('selected');
  } else {
    // Remove the cell from the list of clicked elements
    clickedElements = clickedElements.filter(id => id !== elementId);
    clickedNumbers = clickedNumbers.filter(content => content !== cellContent); // Remove the content from clickedNos
    event.target.classList.remove('selected');
  }
   checkWinCondition();
}
   
  
  // Attach event listeners to all clickable elements
  const clickableElements = document.querySelectorAll('.cell');
  clickableElements.forEach(element => {
    element.addEventListener('click', handleClick);
  });
  

  // Check win conditions
  function checkWinCondition(props) {
    for (const [key, condition] of Object.entries(winConditions)) {
      // Check if all cells in the condition are included in clickedElements
      if (condition.every(cellId => clickedElements.includes(cellId))) {
        // Check if the clicked numbers meet the required condition
        //if (clickedNumbers.includes(CalledNumbers)) {
          alert(`You won!`);
       //   import("/Bingoball.jsx").then(numbersCalled);
          console.log(clickedNumbers);
          console.log(document.querySelectorAll('root').innerHTML);
        //} else {
         // alert(`Please check your numbers.`);
       // }
        return;
      }
    }
  }
}
  
