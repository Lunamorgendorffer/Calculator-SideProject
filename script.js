const calculator = {
    displayValue: '0', // Valeur affichée sur le calculateur, initialisée à 0
    firstOperand: null, // Premier opérande, initialisé à null
    waitingForSecondOperand: false, // Indicateur pour savoir si on attend le deuxième opérande, initialisé à false
    operator: null, // Opérateur utilisé pour effectuer le calcul, initialisé à null
};


function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator; // Destructuration des propriétés de l'objet calculator

    if (waitingForSecondOperand === true) { // Si on attend le deuxième opérande
        calculator.displayValue = digit; // Mettre la valeur du chiffre dans displayValue
        calculator.waitingForSecondOperand = false; // Réinitialiser l'indicateur waitingForSecondOperand à false
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit; // Mettre à jour displayValue en ajoutant le chiffre à la fin
    }
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) { // Si on attend le deuxième opérande
        calculator.displayValue = "0."; // Mettre la valeur affichée à "0."
        calculator.waitingForSecondOperand = false; // Réinitialiser l'indicateur waitingForSecondOperand à false
        return; // Sortir de la fonction
    }
  
    if (!calculator.displayValue.includes(dot)) { // Si le symbole décimal n'est pas déjà présent dans la valeur affichée
        calculator.displayValue += dot; // Ajouter le symbole décimal à la fin de la valeur affichée
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator; // Destructuration des propriétés de l'objet calculator
    const inputValue = parseFloat(displayValue); // Convertir la valeur affichée en nombre à virgule flottante
    
    if (operator && calculator.waitingForSecondOperand)  { // Si un opérateur est déjà défini et qu'on attend le deuxième opérande
        calculator.operator = nextOperator; // Mettre à jour l'opérateur avec le prochain opérateur
        return; // Sortir de la fonction
    }
  
    if (firstOperand == null && !isNaN(inputValue)) { // Si le premier opérande est null et que inputValue est un nombre valide
        calculator.firstOperand = inputValue; // Mettre à jour le premier opérande avec la valeur de inputValue
    } else if (operator) { // Sinon, si un opérateur est déjà défini
        const result = calculate(firstOperand, inputValue, operator); // Calculer le résultat en utilisant la fonction calculate() avec les opérandes et l'opérateur actuels
  
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`; // Mettre à jour la valeur affichée avec le résultat arrondi à 7 décimales
        calculator.firstOperand = result; // Mettre à jour le premier opérande avec le résultat
    }
  
    calculator.waitingForSecondOperand = true; // Mettre waitingForSecondOperand à true pour indiquer qu'on attend le deuxième opérande
    calculator.operator = nextOperator; // Mettre à jour l'opérateur avec le prochain opérateur
}






  

  
