let scr=document.querySelector('div .screenInput');
let AC=document.querySelector('.screen button');
let operators=document.querySelectorAll('.operators button');
let digits=document.querySelectorAll('.digits button');
let utils=document.querySelectorAll('.utils button');
let equals=document.querySelector('.footer button');
let operated=false;
let previousOP='';
let firstOperand='';
let secondOperand='';
let ForRounding=0;
let scrRes='';
let previousSec='';
let activateSec=false;
let pressed=false;
let decimal=false;
let result;
function operate(a,b,op){
    switch(op){
        case '+':
            ForRounding=a+b;
            return ForRounding
        case '-':
            ForRounding=a-b;
            return ForRounding
        case '*':
                ForRounding=a*b;
                return ForRounding
        case '/':
             ForRounding=a/b;
            return ForRounding
    }
}

operators.forEach(
    OP=>{//callback with implicit return
        OP.addEventListener('click',()=>{
            if(secondOperand==''){
                previousOP=OP.innerHTML;
                activateSec=true;
            }else{
                  firstOperand=operate(parseFloat(firstOperand),parseFloat(secondOperand),previousOP);
                  result=firstOperand;
                    previousOP=OP.innerHTML;//saves it before it resets 
                    secondOperand='';
                    pressed=true;
                    scr.textContent=firstOperand;
            }
        })
    }
)
digits.forEach(Digit=>{
    Digit.addEventListener('click',()=>{
        if(!activateSec&&Digit.innerHTML!='.'&&Digit.innerHTML!='clear'&&scr.innerHTML.length<19){
            scr.textContent+=Digit.innerHTML; 
            firstOperand+=Digit.innerHTML;
        }else if(activateSec&&Digit.innerHTML!='.'&&Digit.innerHTML!='clear'&&scr.innerHTML.length<19){
            if(scr.innerHTML==firstOperand){
                scr.textContent='';
                decimal=false;
            }
            if(pressed){
                scr.innerHTML='';
                decimal=false;
            }
            scr.textContent+=Digit.innerHTML;
            secondOperand+=Digit.innerHTML;
            pressed=false;
        }else{
 
        }
    })
})
AC.addEventListener('click',()=>{
    scr.textContent='';
    operated=false;
    previousOP='';
    firstOperand='';
    secondOperand='';
    ForRounding=0;
    scrRes='';
    previousSec='';
    activateSec=false;
    pressed=false;
    result='';
    decimal=false;
   });
equals.addEventListener('click',()=>{
   
     scr.textContent=operate(parseFloat(firstOperand),parseFloat(secondOperand),previousOP);
    
})
utils.forEach(UT=>{
    UT.addEventListener('click',()=>{
        if(UT.textContent=='.'){
            if(!decimal){
             scr.textContent+='.';
             if(secondOperand==''){
                firstOperand+='.';
                
             }else{
                secondOperand+='.';
             }
             
             decimal=true;
            }

        }else if(UT.innerHTML=='clear'){
            if(scr.textContent.indexOf('.')==scr.textContent.length-1){
                decimal=false;
                scr.textContent=scr.textContent.slice(0,scr.textContent.length-1);
                secondOperand=secondOperand.slice(0,secondOperand.length-1);
            }else{

                scr.textContent=scr.textContent.slice(0,scr.textContent.length-1);
                if(secondOperand==''){
                    firstOperand=firstOperand.slice(0,firstOperand.length-1);
                }
                secondOperand=secondOperand.slice(0,secondOperand.length-1);
            }
        }
    })
})



