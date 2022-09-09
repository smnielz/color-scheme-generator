const form = document.getElementById("form")
const colotInput = document.getElementById("color-input")
const menu = document.getElementById("menu")
const colorMain = document.getElementById("color-main")
const hexMain = document.getElementById("hex-main")
let count = document.getElementById("count")
const col = document.getElementsByClassName("col")

function foo(i){
    let divs = document.getElementsByTagName('div')
    let copiedText = document.getElementById("custom-tooltip")
    copiedText.style.top = event.clientY
    copiedText.style.left = event.clientX
    copiedText.style.display = "inline";
    setTimeout( function() {
        copiedText.style.display = "none";
    }, 1000);
    navigator.clipboard.writeText(divs[i+7].textContent)    
}

form.addEventListener("submit", function(e){  
    e.preventDefault() 
    let hex = colotInput.value.substr(1)
    let mode = menu.value
    colorMain.innerHTML = ""
    hexMain.innerHTML = ""
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${mode}&count=${count.value}`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
        .then(res => res.json())
        .then(data => {
            for(let i=0; i<count.value; i++){
                colorMain.innerHTML += `<div class="col color" onclick = "foo(${i})"></div>`
                document.getElementsByClassName("color")[i].style.background = data.colors[i].hex.value
                hexMain.innerHTML += `<div class="col white" onclick = "foo(${i})">${data.colors[i].hex.value}
                </div>`   
                col[i].style.width = `${100 / count.value}%`          
            }                       
        })   
})