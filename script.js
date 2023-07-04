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

const convertToPostFix = (expression) => {
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

const calculateExpression = (expression) => {
    let postfix = convertToPostFix(expression);
    let answer = [];
    let opOne = 0;
    let opTwo = 0;

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

//Look at how the parsing is working for numbers > 9
console.log(calculateExpression('3+5-9+2-5*20')); //Seems to have issues with numbers > 9
console.log(calculateExpression('3+5-4*2'));