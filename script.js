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
let form=document.querySelector('.addTask form')
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log("hello")
})