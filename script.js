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
openFeature()
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
toDoList()