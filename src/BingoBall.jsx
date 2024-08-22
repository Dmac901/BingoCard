import React, { useState } from 'react';
import "./App.css"

const numbersCL = ["Free"];
function BingoBall(props) {
  const [number, setNumber] = useState(null);
  const [numbersCalled, setNumbersCalled] = useState([]);
  const [numbersList, setNumbersList] = useState([]);
  
  // Function to generate a random number between 1 and 75
  const generateNumber = () => {
    if (numbersCalled.length >= 75) {
        alert("All numbers have been called!");
        return;
      }
    let randomNumber;

    // Keep generating a new number until we find a unique one
    do {
      randomNumber = Math.floor(Math.random() * 75) + 1;
    } while (numbersCalled.includes(randomNumber));

    // Update state with the new number and add it to the list of called numbers
    setNumbersCalled(prevNumbers => [...prevNumbers, randomNumber]);
    setNumbersList(prevList => [...prevList, randomNumber]);
    setNumber(randomNumber);
    {numbersCL.push(randomNumber.toString())}
    
  };
// <button onClick={generateAnswers}>CheckAnswers</button>
  return (
    <>
    <div className="bingo-ball">
      <button onClick={generateNumber}>New Ball</button>
      </div>
      <div className="ball-display">
        {number !== null ? (
          <p>{number}</p>
        ) : (
          <p>#</p>
        )}
      </div>
      <div className="numbers">
        <p>Numbers Called:</p>
        <ul>
          {numbersList.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
        <div className="calledNo" value={numbersList}></div>
      </div>
      </>
  );
}
export default BingoBall;


//Main JS code

{

    
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
    //Auto create's card on reload
    populateCard();
    
   // Array to track selected cells w/ free space element
  let clickedElements = ['c18'];
  //Array to track selected numbers w/ free space value
  let clickedNumbers = ['Free'];
  
  // Click handler for cells to track
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
   //  checkWinCondition(); This made the check automatic.
   // This was originally used before the check button
  }

       // Define win conditions in object
  const winConditions = {
    // Vertical
    hl1: ['c6', 'c7', 'c8', 'c9', 'c10'],
    hl2: ['c11', 'c12', 'c13', 'c14', 'c15'],
    hl3: ['c16', 'c17', 'c18', 'c19', 'c20'],
    hl4: ['c21', 'c22', 'c23', 'c24', 'c25'],
    hl5: ['c26', 'c27', 'c28', 'c29', 'c30'],
  
    // Horizontal
    vl1: ['c6', 'c11', 'c16', 'c21', 'c26'],
    vl2: ['c7', 'c12', 'c17', 'c22', 'c27'],
    vl3: ['c8', 'c13', 'c18', 'c23', 'c28'],
    vl4: ['c9', 'c14', 'c19', 'c24', 'c29'],
    vl5: ['c10', 'c15', 'c20', 'c25', 'c30'],
  
    // Diagonal
    dl1: ['c6', 'c12', 'c18', 'c24', 'c30'],
    dl2: ['c10', 'c14', 'c18', 'c22', 'c26']
  };
    
    // Attach event listeners to all clickable elements
    const clickableElements = document.querySelectorAll('.cell');
    const winCheckButton = document.getElementById('winCheck');
    if (winCheckButton) {
      winCheckButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        checkWinCondition();
      });
    }
      clickableElements.forEach(element => {
      element.addEventListener('click', handleClick);
    });
 
    //Win conditions check and validation
    function checkWinCondition() {
      //  winConditions is an object where keys are conditions 
      //and values are arrays of cell IDs. numbersCL is an array from numbers called.
      //

      for (const [key, condition] of Object.entries(winConditions)) {
        // Checks if all cells in the win condition are included in clickedElements
        if (condition.every(cellId => clickedElements.includes(cellId))) {
          // Checks if all values in numbersCL are included in clickedNumbers.
          // Please note that this does not just check the win condition but whole card
          //for accuracy
          if (clickedNumbers.every(num => numbersCL.includes(num))) {
            alert('You won!');
            console.log('Clicked Numbers:', clickedNumbers);
            console.log('Numbers Required:', numbersCL);
          } else {
            alert('Please check your Card.');
            console.log('Clicked Numbers:', clickedNumbers);
            console.log('Numbers Required:', numbersCL);
          }
          return;
        }
      }
    }
  }
    
  