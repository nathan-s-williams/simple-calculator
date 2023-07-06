const exp = require("constants");

/******************************************
 * ARITHMETIC FUNCTIONS
 *****************************************/
const add = (opOne, opTwo) => {
    return opOne + opTwo;
}

const subtract = (opOne, opTwo) => {
    return opOne - opTwo;
}

const multiply = (opOne, opTwo) => {
    return opOne * opTwo;
}

const divide = (opOne, opTwo) => {
    return opOne / opTwo;
}

/******************************************
 * PREPARE STRING FOR CALC
 *****************************************/
const parse = (expression) => {
    expression = String(expression);
    let parsedExpression = [];
    let digitRegEx = /^\d*/
    let operatorRegEx = /^\+|^\-|^\*|^\//
    while (expression.length > 0) {
        let substring = digitRegEx.exec(expression);
        if (substring[0].length == 0) {
            substring = operatorRegEx.exec(expression);
        }
        expression = expression.slice(substring[0].length, expression.length);
        parsedExpression.push(substring[0]);

    }

    return parsedExpression;
}

const convertToPostFix = (expression) => {
    let parsedExpression = parse(expression);
    let stack = [];
    let postfix = [];
    for (let ch of expression) {
        if (ch == '*') {
            stack.push(ch);
        } else if (ch == '/') {
            stack.push(ch);
        } else if (ch == '+') {
            if (stack.length != 0 && (stack[stack.length - 1] == '*' || stack[stack.length - 1] == '/')) {
                while (stack.length > 0) {
                    postfix.push(stack.pop());
                }
                stack.push(ch);
            } else if (stack.length != 0 && (stack[stack.length - 1] == '+' || stack[stack.length - 1] == '-')) {
                postfix.push(stack.pop());
                stack.push(ch);
            } else {
                stack.push(ch);
            }
        } else if (ch == '-') {
            if (stack.length != 0 && (stack[stack.length - 1] == '*' || stack[stack.length - 1] == '/')) {
                while (stack.length > 0) {
                    postfix.push(stack.pop());
                }
                stack.push(ch);
            } else if (stack.length != 0 && (stack[stack.length - 1] == '+' || stack[stack.length - 1] == '-')) {
                postfix.push(stack.pop());
                stack.push(ch);
            } else {
                stack.push(ch);
            }
        } else {
            postfix.push(ch);
        }
    }

    while (stack.length != 0) {
        postfix.push(stack.pop());
    }

    return postfix;
}

/******************************************
 * CALC EXPRESSION
 *****************************************/

const operate = (opOne, operator, opTwo) => {
    switch(operator) {
        case '*':
            multiply(opOne, opTwo);
            break;
        case '/':
            divide(opOne, opTwo);
            break;
        case '+':
            add(opOne, opTwo);
            break;
        case '-':
            subtract(opOne, opTwo);
            break;
        default:
            console.log(`Error: ${operator} is not a valid operator.`)
    }
}

const calculateExpression = (expression) => {
    let postfix = convertToPostFix(expression);
    let answer = [];
    let opOne = 0;
    let opTwo = 0;

    //REPLACE THIS WITH THE OPERATE FUNCTION!!!
    for (let ch of postfix) {
        if (ch == '*') {
            opTwo = Number(answer.pop());
            opOne = Number(answer.pop());
            answer.push(multiply(opOne, opTwo));
        } else if (ch == '/') {
            opTwo = Number(answer.pop());
            opOne = Number(answer.pop());
            answer.push(divide(opOne, opTwo));
        } else if (ch == '+') {
            opTwo = Number(answer.pop());
            opOne = Number(answer.pop());
            answer.push(add(opOne, opTwo));
        } else if (ch == '-') {
            opTwo = Number(answer.pop());
            opOne = Number(answer.pop());
            answer.push(subtract(opOne, opTwo));
        } else {
            answer.push(ch);
        }
    }

    return answer.pop();
}

// console.log(calculateExpression('3+5-2*3'));
module.exports = calculateExpression;