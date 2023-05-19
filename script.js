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

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') { // Si l'opérateur est une addition
        return firstOperand + secondOperand; // Retourner la somme des deux opérandes
    } else if (operator === '-') { // Sinon, si l'opérateur est une soustraction
        return firstOperand - secondOperand; // Retourner la différence entre les deux opérandes
    } else if (operator === '*') { // Sinon, si l'opérateur est une multiplication
        return firstOperand * secondOperand; // Retourner le produit des deux opérandes
    } else if (operator === '/') { // Sinon, si l'opérateur est une division
        return firstOperand / secondOperand; // Retourner le quotient des deux opérandes
    }

    return secondOperand; // Par défaut, retourner le deuxième opérande (cela peut se produire si aucun opérateur valide n'est passé)
}

function resetCalculator() {
    calculator.displayValue = '0'; // Réinitialiser la valeur affichée à '0'
    calculator.firstOperand = null; // Réinitialiser le premier opérande à null
    calculator.waitingForSecondOperand = false; // Réinitialiser l'indicateur waitingForSecondOperand à false
    calculator.operator = null; // Réinitialiser l'opérateur à null
}

function updateDisplay() {
    const display = document.querySelector('.calculator-screen'); // Sélectionner l'élément avec la classe 'calculator-screen' dans le document
    display.value = calculator.displayValue; // Mettre à jour la valeur de l'élément avec la valeur affichée du calculateur
}

updateDisplay();

const keys = document.querySelector('.keys'); // Sélectionner l'élément avec la classe 'keys' dans le document

keys.addEventListener('click', event => { // Ajouter un écouteur d'événements de clic à l'élément 'keys'
    const { target } = event; // Extraire la cible de l'événement de clic
    const { value } = target; // Extraire la valeur de la cible

    if (!target.matches('button')) { // Si la cible ne correspond pas à un élément 'button', ne rien faire et sortir de la fonction
        return;
    }

    switch (value) { // Vérifier la valeur de la cible
        case '+': // Si la valeur est '+'
        case '-': // Ou si la valeur est '-'
        case '*': // Ou si la valeur est '*'
        case '/': // Ou si la valeur est '/'
        case '=': // Ou si la valeur est '='
            handleOperator(value); // Appeler la fonction handleOperator avec la valeur comme argument
            break;
        case '.': // Si la valeur est '.'
            inputDecimal(value); // Appeler la fonction inputDecimal avec la valeur comme argument
            break;
        case 'all-clear': // Si la valeur est 'all-clear'
            resetCalculator(); // Appeler la fonction resetCalculator
            break;
        default: // Pour toutes les autres valeurs
            if (Number.isInteger(parseFloat(value))) { // Si la valeur est un entier valide
                inputDigit(value); // Appeler la fonction inputDigit avec la valeur comme argument
            }
    }

    updateDisplay(); // Appeler la fonction updateDisplay pour mettre à jour l'affichage
});







  

  
