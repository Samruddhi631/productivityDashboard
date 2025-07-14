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
// openFeature()
let form=document.querySelector('.addTask form');
let taskInput=document.querySelector('.addTask form #task-input');
let taskDetailInput=document.querySelector('.addTask form textarea');
let taskCheckBox=document.querySelector('.addTask form #check');
let allTask=[
    {
        task:'Mandir Jao',
        details:'Hanuman jee vale',
        imp:true
    },
    {
        task:'Recording karo',
        details:'cohort ke liye',
        imp:true
    },
]
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(taskInput.value);
    console.log(taskDetailInput.value);
    console.log(taskCheckBox.checked)
})