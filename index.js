"use strict";
// used module pattern concept to increase security 
var expression = (() => {
    // below declare is all private variables
    // declare variables with it's DOM element
    // use below var to access DOM , it more faster then accessing dom by getElement()
    var dis = document.getElementById('dis');
    var memoryPart = document.getElementById('memory');
    var xCube = document.getElementById("x3");
    var cubeRoot = document.getElementById("cbrt");
    var yRootX = document.getElementById("yRootx");
    var twoRaisedX = document.getElementById("2x");
    var eRaisedX = document.getElementById("ex");
    var logyX = document.getElementById("logyx");
    //display value
    var value = "0";
    // variable for memory value
    var memoryValue = [];
    //toggle button
    var toggleValue = true;
    // below is all private variable , that can't be access by outside function 
    // function to set expression in display
    var setExpresion = (a) => {
        if (value == "0") {
            value = "";
        }
        value += a;
        dis.value = value;
    };
    // to add PI value in expression
    var addPI = () => {
        setExpresion(Math.PI.toFixed(6));
        dis.value = value;
    };
    //to get result of expression
    var getResult = () => {
        let final_answer;
        // condition to for '| |' math operation
        if (value.includes("|-")) {
            value = value.slice(2, -1);
            final_answer = value;
        }
        //calculate expression
        else if (value) {
            final_answer = eval(value);
        }
        else
            final_answer = "0";
        //set value(variable) with final answer
        value = final_answer.toString();
        // display final answer
        dis.value = value;
    };
    // function to clear screen
    var clear_display = () => {
        value = "0";
        setExpresion(value);
    };
    // function to clear last digit
    var clear_last_digit = () => {
        value = value.slice(0, value.length - 1);
        if (!value.length) {
            value = "0";
        }
        dis.value = value;
    };
    // for calculate the factorial
    var factorial = () => {
        let number = Number(value);
        let factofNumber = 1;
        for (let i = 2; i <= number; i++)
            factofNumber = factofNumber * i;
        value = factofNumber.toString();
        dis.value = value;
    };
    // for generate random value
    var getRandomValue = () => {
        let randValue = Math.random();
        if (value) {
            setExpresion(randValue.toString());
        }
        else {
            value = randValue.toString();
            dis.value = value;
        }
    };
    // for calculate e Raised to x value
    var e_raised_to_x = () => {
        let lastDigit = value.slice(-1);
        let final_answer = Math.pow(2.7182, Number(lastDigit));
        value = value.slice(0, -1);
        setExpresion(final_answer.toString());
    };
    // for calculate cube value
    var cube = () => {
        let lastDigit = value.slice(-1);
        let final_answer = Math.pow(Number(lastDigit), 3);
        value = value.slice(0, -1);
        setExpresion(final_answer.toString());
    };
    // for calculate squre value
    var squre = function () {
        let lastDigit = value.slice(-1);
        let final_answer = Math.pow(Number(lastDigit), 2);
        expression.setValue(value.slice(0, -1));
        setExpresion(final_answer.toString());
    };
    // for set floor value
    var setFloorValue = (a) => {
        // condition to set floor down
        if (a == "fd")
            value = Math.floor(Number(value)).toString();
        // condition to set floor up
        else
            value = parseInt(value + 1).toString();
        // set display content
        dis.value = value;
    };
    // for button that change some math function with some new functions
    var changeFunction = () => {
        if (toggleValue) {
            xCube.innerText = "x3";
            xCube.value = "x3";
            cubeRoot.innerText = "3√x";
            cubeRoot.value = "Math.cbrt(";
            yRootX.innerText = "y√x";
            yRootX.value = "Math.pow(";
            twoRaisedX.innerText = "2^x";
            twoRaisedX.value = "Math.pow(2,";
            logyX.innerText = "logyX";
            eRaisedX.innerText = "eX";
            eRaisedX.value = "ex";
            toggleValue = !toggleValue;
        }
        else {
            var x3 = document.getElementById("x3");
            x3.innerText = "x²";
            // var x2 = <HTMLButtonElement>document.getElementById("x3");
            x3.value = "x2";
            cubeRoot.innerText = '2√x';
            cubeRoot.value = "Math.sqrt(";
            yRootX.innerText = 'x^y';
            yRootX.value = "Math.pow(";
            twoRaisedX.innerText = '10^x';
            twoRaisedX.value = "Math.pow(10,";
            logyX.innerText = "log";
            eRaisedX.innerText = "ln";
            eRaisedX.value = "ln";
            toggleValue = !toggleValue;
        }
    };
    // set diaplay value in exponent form
    var EF = () => {
        let v = Number(value);
        v = Number(v.toExponential());
        value = "0";
        setExpresion(v.toString());
    };
    // calculate all memory functions
    var memoryFunction = (id) => {
        switch (id) {
            // to save display answer in memory
            case "MS":
                memoryValue.unshift(Number(value));
                break;
            // to clear all value in memory
            case "MC":
                memoryValue = [];
                break;
            // to add display vlaue with memory value
            case "M+":
                if (memoryValue[0])
                    memoryValue[0] += Number(value);
                break;
            // to subtract display vlaue with memory value
            case "M-":
                if (memoryValue[0])
                    memoryValue[0] -= Number(value);
                break;
            // to recall latest vlaue in memory
            case "MR":
                if (memoryValue[0]) {
                    let lastValue = memoryValue[0];
                    setExpresion(lastValue.toString());
                }
                break;
        }
        // to add reslut in memory vlaue
        memoryPart.innerHTML = memoryValue.length === 0 ? "Empty Memory (Use <b>MS</b> to store memory)" : memoryValue.toString();
    };
    var findln = function () {
        let number = Number(value);
        let final_answer = Math.log(number) / Math.log(2.71828);
        value = final_answer.toString();
        dis.value = value;
    };
    // to calculate trignometry functions
    var mathFunction = (func) => {
        // get the degree from the user
        let degrees = Number(value.slice(-2));
        value = value.slice(0, value.length - 2);
        // convert degree into radius
        var radians = (degrees * Math.PI) / 180;
        var final_answer = 0;
        // calculate final answer according user given function
        switch (func) {
            case "sin":
                final_answer = Math.sin(radians);
                break;
            case "cos":
                final_answer = Math.cos(radians);
                break;
            case "tan":
                final_answer = Math.tan(radians);
                break;
            case "cosec":
                final_answer = 1 / Math.sin(radians);
                break;
            case "sec":
                final_answer = 1 / Math.cos(radians);
                break;
            case "cot":
                final_answer = 1 / Math.tan(radians);
                break;
        }
        // set expression vlaue with final answer
        setExpresion(final_answer.toFixed(2));
    };
    /**  return public function that act as intermediate
    between private function and user's public function */
    return {
        // return public functin updateExpression1 to manipulate private values
        updateExpression1: (a) => {
            switch (a) {
                case "Math.PI":
                    addPI();
                    break;
                case "=":
                    getResult();
                    break;
                case "clear":
                    clear_display();
                    break;
                case "CL":
                    clear_last_digit();
                    break;
                case "!":
                    factorial();
                    break;
                case "randValue":
                    getRandomValue();
                    break;
                case "ex":
                    e_raised_to_x();
                    break;
                case "x3":
                    cube();
                    break;
                case "x2":
                    squre();
                    break;
                case "fu":
                    setFloorValue(a);
                    break;
                case "fd":
                    setFloorValue(a);
                    break;
                case "ln":
                    findln();
                    break;
                // case "deg":
                //     changeAngle();
                //     break;
                default:
                    setExpresion(a);
            }
        },
        // public function that set private variable value
        setValue: (v) => {
            value = v;
        },
        // return some more public function
        changeFunction: changeFunction,
        memoryFunction: memoryFunction,
        mathFunction: mathFunction,
        EF: EF,
    };
})();
// to update expression
function updateExpresion(a) {
    expression.updateExpression1(a);
}
// to update funcitons
function updateFunction() {
    expression.changeFunction();
}
// to manipulate memory value
function memoryFunction1(id) {
    expression.memoryFunction(id);
}
// to calculate trignometry functions
function calculateTrigo(func) {
    expression.mathFunction(func);
}
// to set display value into exponential form
function setEF() {
    expression.EF();
}
// if you want to add something between expression
function inputBetweenExp() {
    var displayValue = document.getElementById("dis");
    expression.setValue(displayValue.value);
}
