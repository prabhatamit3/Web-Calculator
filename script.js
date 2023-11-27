//primitives=number,string,null,undefined,boolean
//reference= [] {} ()
// arr=[1,2,3,4,5,6,7,8,9]
// function showelement(){
//     //alert(arr.pop());
//     var input=document.getElementById("phoneNumber")
//     if (true) {  
//         var pno = input.value; 
//         const regex = /^(99|91|62)\d{8}$/ ; 
//         var test= regex.test(phoneNumber);  
//         alert(pno +' is '+test);  
//       }  
//     //alert(pno)
// } 
var collectString=''
document.addEventListener("DOMContentLoaded", function() {  
  var buttons = document.getElementsByClassName("num");  
  var paragraph = document.getElementById("valuedisplay");  
  for (var i = 0; i < buttons.length; i++) {  
      buttons[i].addEventListener("click", function() {  
          var value = this.innerHTML ;
          if(value !='='){
            collectString=collectString+value;
            paragraph.innerHTML=collectString
          }else{
            //var res=calculateExpression(collectString)
            var result = calculate(collectString);  
            if (result !== null) {  
              if(!Number.isInteger(result)){
                result=result.toFixed(4)
              }
              console.log(`Result: ${result}`);  
              
              paragraph.innerHTML=result
              collectString=result
            } else {  
              console.log("Invalid expression");  
            } 

            //console.log("Result = "+res)
          }
          console.log(collectString);
          
          //changeValue(value);  
      });  
  }  
});  
function calculate(expression) {  
  try {  
    // Replace all instances of "x" or "X" with "*"  
    expression = expression.replace(/x|X/g, "*");  
  
    // Use the built-in JavaScript function "eval" to safely evaluate the expression  
    const result = new Function(`return ${expression}`)();  
  
    // Return the evaluated result  
    return result;  
  } catch (error) {  
    console.error(`Error: ${error}`);  
    return null;  
  }  
}  
  

function calculateExpression(expression) {  
  // Remove any spaces from the expression  
  expression = expression.replace(/\s/g, "");  
  
  // Split the expression into an array of numbers and operators  
  const numbersAndOperators = expression.match(/[+\-*/]?([0-9.]+)/g);  
  
  // Define operator precedence  
  const precedence = {  
    "+": 1,  
    "-": 1,  
    "*": 2,  
    "/": 2  
  };  
  
  // Define stacks for numbers and operators  
  const numbersStack = [];  
  const operatorsStack = [];  
  
  // Iterate over the numbers and operators array  
  for (let i = 0; i < numbersAndOperators.length; i++) {  
    const token = numbersAndOperators[i];  
  
    // If the token is a number, push it onto the numbers stack  
    if (!isNaN(token)) {  
      numbersStack.push(parseFloat(token));  
    }  
  
    // If the token is an operator, pop operators from the operators stack until the top operator has lower precedence, then push the token onto the operators stack  
    else {  
      while (operatorsStack.length > 0 && precedence[operatorsStack[operatorsStack.length - 1]] >= precedence[token]) {  
        const operator = operatorsStack.pop();  
        const operand2 = numbersStack.pop();  
        const operand1 = numbersStack.pop();  
        const result = applyOperator(operator, operand1, operand2);  
        numbersStack.push(result);  
      }  
      operatorsStack.push(token);  
    }  
  }  
  
  // Pop any remaining operators from the operators stack and apply them to the numbers on the numbers stack  
  while (operatorsStack.length > 0) {  
    const operator = operatorsStack.pop();  
    const operand2 = numbersStack.pop();  
    const operand1 = numbersStack.pop();  
    const result = applyOperator(operator, operand1, operand2);  
    numbersStack.push(result);  
  }  
  
  // The final result is the only number on the numbers stack  
  return numbersStack[0];  
}  
  
function applyOperator(operator, operand1, operand2) {  
  switch (operator) {  
    case "+":  
      return operand1 + operand2;  
    case "-":  
      return operand1 - operand2;  
    case "*":  
      return operand1 * operand2;  
    case "/":  
      return operand1 / operand2;  
  }  
}  

