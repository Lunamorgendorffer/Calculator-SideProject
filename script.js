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


