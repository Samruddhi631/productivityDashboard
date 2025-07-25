function openFeature(){
    let allElems=document.querySelectorAll(".elem");
    let allFullElems=document.querySelectorAll(".fullElems");
    let allFullElemsBackBtn=document.querySelectorAll(".fullElems .back");
    allElems.forEach(function(elem){
        elem.addEventListener('click',()=>{
            allFullElems[elem.id].style.display="block"
        })
    })
    allFullElemsBackBtn.forEach((back)=>{
        back.addEventListener('click',()=>{
            allFullElems[back.id].style.display="none"
        })
    })
}
openFeature();

function toDoList(){
    let form=document.querySelector('.addTask form');
let taskInput=document.querySelector('.addTask form #task-input');
let taskDetailInput=document.querySelector('.addTask form textarea');
let taskCheckBox=document.querySelector('.addTask form #check');

let currentTask=[]

if(localStorage.getItem('currentTask')){
    currentTask=JSON.parse(localStorage.getItem('currentTask'))
}
else{
    console.log('task list is empty')
}

let allTask=document.querySelector(".allTask");
function renderTask(){
    let sum = '';
    currentTask.forEach((elem, idx) => {
        sum += `
        <div class="task">
            <details>
                <summary>
                    ${elem.task}
                    <span class="${elem.imp}"> imp </span>
                </summary>
                <p>${elem.details || 'No details provided.'}</p>
            </details>
            <button id="${idx}">Mark as completed</button>
        </div>`;
    });
    allTask.innerHTML = sum;
}

renderTask();

allTask.addEventListener('click',(dets)=>{
    if(dets.target.tagName==='BUTTON'){
        let idx=+dets.target.id;
        currentTask.splice(idx,1);
        localStorage.setItem('currentTask',JSON.stringify(currentTask))
        renderTask();
    }
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    currentTask.push({task:taskInput.value,
        details:taskDetailInput.value,
        imp:taskCheckBox.checked})
        taskInput.value=" "
        taskDetailInput.value=" "
        taskCheckBox.checked=false;
        localStorage.setItem('currentTask',JSON.stringify(currentTask))
        renderTask();
})
// localStorage.clear();


}
toDoList();

function dailyPlanner(){
    let dayPlanData=JSON.parse(localStorage.getItem('dayPlanData'))||{}
let dayPlanner=document.querySelector('.day-planner')
let hours =Array.from({length:18},(elem,idx)=>`${6+idx}:00 - ${7+idx}:00`)
let wholeSum=''
hours.forEach((elem,idx)=>{
    let savedData=dayPlanData[idx]||' ';
    
    wholeSum+=` <div class="day-planner-time">
                    <p>${elem}</p>
                    <input id='${idx}' type="text" name="" id="" placeholder="..." value="${savedData}">
                </div>`
})
dayPlanner.innerHTML=wholeSum;
let dayplannerInput=document.querySelectorAll('.day-planner-time input')
dayplannerInput.forEach((elem)=>{
    elem.addEventListener('input',()=>{
        dayPlanData[elem.id]=elem.value
        localStorage.setItem('dayPlanData',JSON.stringify(dayPlanData))
    })
})
}
dailyPlanner();

function motivationalQuotes(){
    let quote=document.querySelector(".motivation-2 h1")
    let author=document.querySelector(".motivation-3 h2")
    async function fetchQuote(){
    let response= await fetch('https://api.quotable.io/random')
    let data=await response.json()
    quote.innerHTML=data.content;
    author.innerHTML=`- ${data.author}`;
}
fetchQuote()
}
motivationalQuotes();

function pomodoroTimer(){
    let timer=document.querySelector(".pomo-timer h1")
let start=document.querySelector(".pomo-timer .start-timer")
let pause=document.querySelector(".pomo-timer .pause-timer")
let reset=document.querySelector(".pomo-timer .reset-timer")
let session=document.querySelector(".pomodoro-fullPage .session")
let totalSeconds=1500;
let timerIntervel=null;
let worksesion=true
function updateTimer(){
    let minutes=Math.floor(totalSeconds/60);
    let seconds=totalSeconds%60
    // console.log(minutes,seconds)
    timer.innerHTML=`${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
}

function startTimer(){
    clearInterval(timerIntervel)
    if(worksesion){
    timerIntervel= setInterval(()=>{
    if(totalSeconds>0){
        totalSeconds--;
        updateTimer()
    }
    else{
        worksesion=false
        clearInterval(timerIntervel)
        totalSeconds=5*60;
        timer.innerHTML='05:00'
        session.innerHTML='Take a Break'
        session.style.backgroundColor="var(--blue)"
    }
},1000)
    }
    else{
    timerIntervel= setInterval(()=>{
    if(totalSeconds>0){
        totalSeconds--;
        updateTimer()
    }
    else{
        worksesion=true
        clearInterval(timerIntervel)
        totalSeconds=25*60;
        timer.innerHTML='25:00';
        session.innerHTML='Work Session'
        session.style.backgroundColor="var(--green)"
    }
},1000)
    }
}
function pauseTimer(){
    clearInterval(timerIntervel)
}
function resetTimer(){
    clearInterval(timerIntervel);
    totalSeconds=1500;
    updateTimer()
}
start.addEventListener('click',startTimer)
pause.addEventListener('click',pauseTimer)
reset.addEventListener('click',resetTimer)
}

pomodoroTimer()

let header1Time=document.querySelector('.header1 h1');
let header1Date=document.querySelector('.header1 h2');
let header1Location=document.querySelector('.header1 h4');
let header2Temp=document.querySelector('.header2 h2');
let header2Weather=document.querySelector('.header2 h4');
let header2Precip=document.querySelector('.header2 .precipitation');
let header2Humidity=document.querySelector('.header2 .humidity');
let header2Wind=document.querySelector('.header2 .wind');


let apiKey='5ae34a34539840ac89f135750252207'
let city='khopoli'
async function weatherApiCall(){
    let response= await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    let data= await response.json();
    console.log(data)
    header2Temp.innerHTML=`${data.current.temp_c}°C`
    header2Weather.innerHTML=`${data.current.condition.text}`;
    header2Precip.innerHTML=`Precipitation: ${data.current.precip_mm}`;
    header2Humidity.innerHTML=`Humidity: ${data.current.humidity}%`;
    header2Wind.innerHTML=`Wind: ${data.current.wind_mph} mph`
    header1Location.innerHTML=`${data.location.name} (${data.location.region})`
}
weatherApiCall()

function timeDate(){
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOFYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const now=new Date();
    const day=daysOfWeek[now.getDay()];
    const hour=now.getHours();
    const minutes=now.getMinutes();
    const seconds=now.getSeconds();
    const date=now.getDate();
    const month=monthsOFYear[now.getMonth()];
    const year=now.getFullYear();
    if(hour>12){
        header1Time.innerHTML=`${day}, ${hour - 12}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')} PM`;
    }
    else{
        header1Time.innerHTML=`${day}, ${hour}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')} ${ampm} AM`;
    }
    header1Date.innerHTML=`${date} ${month} ${year}`
}
setInterval(()=>{
timeDate()
},1000)

