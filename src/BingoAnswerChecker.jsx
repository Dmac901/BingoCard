import React, { useState } from "react"

const winconditions = {
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
  