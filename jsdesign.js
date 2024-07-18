const startButton= document.querySelector(".btn");
const rules=document.querySelector(".rules");
const exitButton= document.querySelector(".button .ExitButton");
const continueButton= document.querySelector(".button .cnButton");
const Question=document.querySelector(".question");
const opList=document.querySelector(".options")
const timeCounter=document.querySelector(".timeCount .seconds")
const timeLine=document.querySelector(".question header .timeline")
const finishedTime=document.querySelector(".QuestionHeader .timeLeft")
const PlayAudio = new Audio("pic/countdown.mp3");
const First_line=document.querySelector(".First_line")
let timeValue;
let number_of_Q;
startButton.onclick =()=>{
    const timePerQ=document.querySelector("#time_sec")
    timeValue=timePerQ.value;
    let first_rule='You will have only <span style="color: blue;"> '+timeValue+' seconds</span> per each question.'
    const num_ques=document.querySelector("#num-questions")
    number_of_Q=num_ques.value;
    First_line.innerHTML=first_rule
    timeCounter.innerHTML=timeValue
    rules.classList.add("activated")
}
exitButton.onclick =()=>{
    rules.classList.remove("activated")
}

continueButton.onclick =()=>{
    rules.classList.remove("activated")
    Question.classList.add("activeQ")
    showQuestion(0)
    startTimer(timeValue)

    timerLine(0)
}
const nextButton=document.querySelector(".nextButton")
const resultBox=document.querySelector(".resultBox")
const restartAgButton=document.querySelector(".lastbutton .restartAg")
const exitAgButton=document.querySelector(".lastbutton .quit")
exitAgButton.onclick=()=>{
     window.location.reload()
}

let c=0;
let counter;
// let timeValue=timePerQ.value;
let line;
let lineWidth=0
let score=0
nextButton.onclick =()=>{
    // if(c<QuizQestions.length-1)
    if(c<number_of_Q-1)
    {
        c++;
        showQuestion(c)
        clearInterval(counter)
        startTimer(timeValue)

        clearInterval(line)
        timerLine(lineWidth)
        nextButton.style.display="none"
        finishedTime.textContent = "Time Left";
    }
    else
    {
        console.log("You Have Completed Your Quiz 😍")
        showResult()
    }
}
function showQuestion(index){
    const queText=document.querySelector(".text1")
    // const opList=document.querySelector(".options")
    let opPresentor='<div class="optionSec"><span>' + QuizQestions[index].opt[0]  +'</span></div>'
                    + '<div class="optionSec"><span>' + QuizQestions[index].opt[1]  +'</span></div>'
                    + '<div class="optionSec"><span>' + QuizQestions[index].opt[2]  +'</span></div>'
                    + '<div class="optionSec"><span>' + QuizQestions[index].opt[3]  +'</span></div>'
    let quePresentor="<span>"+QuizQestions[index].num+'.'+QuizQestions[index].question+"</span>"
    queText.innerHTML=quePresentor
    opList.innerHTML=opPresentor
    const totalQuestion=document.querySelector(".TQ")
    let totalQuestionPresentor='<p>'+QuizQestions[index].num+' of '+number_of_Q+ ' Question</p>'
    totalQuestion.innerHTML=totalQuestionPresentor;
    const nextqutext=document.querySelector("footer button");
    let x="Next Que"
    if(QuizQestions[index].num==number_of_Q)
    {
         x="Submit"
        nextqutext.innerHTML=x
    }
    else nextqutext.innerHTML=x
     

    const option=opList.querySelectorAll(".optionSec")
    for(let i=0;i<option.length;i++)
    {
        option[i].setAttribute("onclick","optionSelected(this)")
    }
}

let tick='<div class="tick icon"><i class="fas fa-check"></i></div>'; 
let cross= '<div class="cross icon"><i class="fas fa-times"></i></div>'; 

function optionSelected(answer){
    clearInterval(counter)
    clearInterval(line)
    PlayAudio.pause()
    PlayAudio.currentTime = 0; 
   let uAns=answer.textContent;
   let corrAns=QuizQestions[c].answer;
   let alloptions=opList.children.length
   if(uAns==corrAns)
   {
    score+=1
    console.log(score)
    answer.classList.add("correct")
    console.log("You are correct")
   answer.insertAdjacentHTML("beforeend", tick); 
   }
    else
    {
        answer.classList.add("Incorrect")
        console.log("YOU are wrong")
        answer.insertAdjacentHTML("beforeend", cross);
        for(let i=0;i<alloptions;i++)
        {
            if(opList.children[i].textContent==corrAns)
            {
                opList.children[i].setAttribute("class","optionSec correct")
                opList.children[i].insertAdjacentHTML("beforeend", tick);
            }
        }
    }
    for(let i=0;i<alloptions;i++)
    {
        opList.children[i].classList.add("disable");
    }

    nextButton.style.display="block"
}

function showResult(){
    rules.classList.remove("activated")
    Question.classList.remove("activeQ")
    resultBox.classList.add("activeResult")
    const scoreText=document.querySelector(".quizScore")
    const Scorebig=document.querySelector(".Scorebig")
    let bigsc='<p>SCORE:' +score+'</p>'
    Scorebig.innerHTML=bigsc
    if(score>=(number_of_Q-(number_of_Q/5))){
      let scoreNum='<span>Congratulations 👍 You Got <p>'+score+'</p> Out of <p>'+number_of_Q+'</p></span>'
      scoreText.innerHTML=scoreNum
    }
    else if(score>1){
        let scoreNum='<span>Carry On 👌 You Got <p>'+score+'</p> Out of <p>'+number_of_Q+'</p></span>'
        scoreText.innerHTML=scoreNum
      }
      else{
        let scoreNum='<span>I Am  Sorry 😢 You Got <p>'+score+'</p> Out of <p>'+number_of_Q+'</p></span>'
        scoreText.innerHTML=scoreNum
      }
}



restartAgButton.onclick = () => {
    // Reset the relevant states
    c = 0;
    lineWidth = 0;
    score = 0;

    // Hide the result box and show the question page
    resultBox.classList.remove("activeResult");
    Question.classList.add("activeQ");

    // Show the first question and start the timer
    showQuestion(c);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(line);
    timerLine(lineWidth);

    // Hide the next button initially
    nextButton.style.display = "none";
    finishedTime.textContent = "Time Left";
};

function startTimer(time){
    counter=setInterval(timer,1000)
    function timer(){
        timeCounter.textContent=time;
        time--;
        // if(time>=0)
        // {
        //     timerLine(time);
        // }
        if(time<9)
        {
            let zeroadding=timeCounter.textContent
            timeCounter.textContent=0+zeroadding
        }
        if (time === 2) {
            PlayAudio.play();
        }
        if(time<0)
        {
            clearInterval(counter)
            timeCounter.textContent="00" 
            finishedTime.textContent = "Time Off";
            let corrAns=QuizQestions[c].answer;
            let alloptions=opList.children.length
            for(let i=0;i<alloptions;i++)
            {
                if(opList.children[i].textContent==corrAns)
                {
                    opList.children[i].setAttribute("class","optionSec correct")
                    opList.children[i].insertAdjacentHTML("beforeend", tick);
                }
            }
            for(let i=0;i<alloptions;i++)
            {
                opList.children[i].classList.add("disable");
            }
            
            nextButton.style.display="block"
        }
    }
}

function timerLine(time){
    line=setInterval(timer,(((34/10)*timeValue)-((timeValue/5)-2)))
    function timer(){
        time++;
        timeLine.style.width=time+"px"
        if(time>319)
        {
            clearInterval(line)
        }
    }
}