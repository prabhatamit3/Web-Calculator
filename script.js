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

          if(value=='='){
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
          }else if(value=='C'){
            collectString=''
            paragraph.innerHTML=collectString

          }else if(value=='CE'){
            collectString=collectString.substring(0,collectString.length-1)
            paragraph.innerHTML=collectString

          }
          else{
            collectString=collectString+value;
            paragraph.innerHTML=collectString
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
  
