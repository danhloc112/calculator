const jq = $.noConflict();
jq(document).ready(function() {
    const inputField = jq('#input')
    const resultField = jq('#result')
    const btn = jq('.btn');
    let firstNum = '';
    let secondNum = '';
    let sign = '';
    let displayText = '';
    let result = '';
    const pressArr = [
        {which: 49, val: '1'},
        {which: 50, val: '2'},
        {which: 51, val: '3'},
        {which: 52, val: '4'},
        {which: 53, val: '5'},
        {which: 54, val: '6'},
        {which: 55, val: '7'},
        {which: 56, val: '8'},
        {which: 57, val: '9'},
        {which: 48, val: '0'},
        {which: 43, val: '+'},
        {which: 45, val: '-'},
        {which: 42, val: '*'},
        {which: 47, val: '/'},
        {which: 37, val: 'per'},
        {which: 8, val: 'del'}
    ]

    function displayInput(input) {
        inputField.text(input)
    }
    function displayResult(input) {
        resultField.text(input)
    }

    function coumpute(sign) {
        switch(sign) {
            case "+":
                // console.log(firstNum,secondNum)
                result = Number(firstNum) + Number(secondNum);
                break;
            case "-":
                result = Number(firstNum) - Number(secondNum);
                break;
            case "*":
                result = Number(firstNum) * Number(secondNum);
                break;
            case "/":
                result = Number(firstNum) / Number(secondNum);
                break;
        }
    }

    function inputCompute(value) {
        if(!isNaN(value)) {
            if(!sign) {
                firstNum += value;
                displayText += value; 
                // console.log(firstNum)
            }
            else {
                if(result && !secondNum) {
                    firstNum = result;
                }
                displayText += value;   
                secondNum += value;
                coumpute(sign)
            }
            displayResult(result)
        }
        else if(value == '+' || value == '-' || value == '*' || value == '/') {
            secondNum = '';
            displayText += value;
            sign = value;
        }
        else if(value == '.') {
            if(secondNum) {
                secondNum += value;
                displayText += value;   
            }
            else {
                firstNum += value;
                displayText += value;   
                // console.log(firstNum)
            }
        }
        else if (value == 'c') {
            displayText = '';
            result = '';
            sign = '';
            firstNum = '';
            secondNum = '';
            resultField.empty()
        }
        else if(value == 'equal') {
            displayResult(result)
            displayInput(displayText)
        }
        else if (value == 'del') {
            if(!displayText) {
                result = '';
                sign = '';
                firstNum = '';
                secondNum = '';
                resultField.empty()
            }
            if (secondNum) {
                secondNum = secondNum.toString()
                // console.log(typeof secondNum)
                secondNum = secondNum.slice(0,-1);
                displayText = displayText.slice(0,-1)
                coumpute(sign)
                displayResult(result)
            }
            else {
                firstNum = firstNum.toString()
                firstNum = firstNum.slice(0,-1)
                displayText = displayText.slice(0,-1);
            }
        }
        else if(value == 'per') {
            if (secondNum) {
                displayText = displayText.slice(0,-secondNum.length)
                secondNum = secondNum/100;
                displayText += secondNum;
                coumpute(sign)
                displayResult(result)
            }
            else {
                displayText = '';
                firstNum = firstNum/100;
                displayText += firstNum;
            }
        }
    }
    btn.on('click', function() {
        let value = jq(this).val();
        inputCompute(value)
        displayInput(displayText)
    })
    jq('.dark-mode').click(function() {
            jq('body').toggleClass('body-night');
            jq('.result').toggleClass('result-night');
            jq('.main').toggleClass('div-night')
            btn.toggleClass('btn-night')
            inputField.toggleClass('border-night text-night')
            resultField.toggleClass('text-night')
            jq('.icon').toggleClass('text-night')
            jq('.title').toggleClass('text-night')
        }
    )
    jq(document).on('keypress', function(e) {
        let value = '';
        // console.log(pressArr[0].which)
        // console.log(e.which)
        for( let i in pressArr) {
            // console.log(pressArr[i].which,e.which)
            if(e.which == pressArr[i].which) {
                // console.log(e.which, pressArr[i].which)
                value = pressArr[i].val;
            }
        }
        inputCompute(value)
        displayInput(displayText)
    })
    jq(document).on('keydown', function(e) {
        let value = '';
        if(e.which == 8) {
            value = 'del';
        }
        inputCompute(value)
        displayInput(displayText)
    })
})
