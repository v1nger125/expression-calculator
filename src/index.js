function eval() {
    // Do not use eval!!!
    return;
}

const calc = {
    "+": (a,b) => +a + +b,
    "-": (a,b) => +a - +b,
    "*": (a,b) => +a * +b,
    "/": (a,b) => +a / +b
}

function checkBracket(str){
    let conf = new Array();
    for (let i = 0; i < str.length; i++) {
        conf.push(str[i]);
        if (conf.length >= 2 && conf[conf.length-1] == ")" && conf[conf.length-2] == "(") {
            conf.pop();
            conf.pop();
        }
    }
    if (conf.length == 0) { 
        return true;
    }
    else {
        return false;
    }
}

function calcSplit(str){
    let arr = str.split("");
    for (let i = 0; i < arr.length - 1; i++) {
        if (isFinite(arr[i]) && isFinite(arr[i+1])) {
            arr.splice(i, 2, arr[i] + arr[i+1]);
            i--;
        }
    }
    return arr;
}

function isOperation (str){
    if (str == "*" || str == "/" || str== "+" || str == "-") return true;
    else return false;
}

function isBracket (str) {
    if (str == "(" || str == ")") return true;
    else return false;
}

function isFirstPriority (str) {
    if (str == "*" || str == "/") return true;
    else return false;
}

function expressionCalculator(expr) {
    let arr = expr.split(" ");
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "") {
            arr.splice(i, 1);
            i--;
        }
        else{
            if (!isFinite(arr[i]) && !isOperation(arr[i]) && !isBracket(arr[i])) {
                arr.splice(i, 1, ...calcSplit(arr[i]));
            }
            if (arr[i] == "(" || arr[i] == ")") {
                str += arr[i];
            }
        }
    }
    if (!checkBracket(str)) throw new SyntaxError("ExpressionError: Brackets must be paired");
    let i = 1;
    while (arr.length > 1) {
        if (isFirstPriority(arr[i]) && isFinite(arr[i+1]) && isFinite(arr[i-1])){
            if (arr[i+1] == 0 && arr[i] == "/") throw new TypeError("TypeError: Division by zero.");
            arr.splice(i-1, 3, calc[arr[i]](arr[i-1],arr[i+1]));
            i = 1;
        } 
        else if (isFinite(arr[i+1]) && isFinite(arr[i-1]) && isOperation(arr[i]) && !isFirstPriority(arr[i+2])){
            arr.splice(i-1, 3, calc[arr[i]](arr[i-1],arr[i+1]));
            i = 1;
        }
        else if (isBracket(arr[i+1]) && isBracket(arr[i-1]) && isFinite(arr[i])) {
            arr.splice(i-1, 3, arr[i]);
            i = 1;
        }
        else {i++;}
        if (i == 100) break
    }
    return +arr[0];
}

module.exports = {
    expressionCalculator
}