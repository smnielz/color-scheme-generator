const form = document.getElementById("form")
const colotInput = document.getElementById("color-input")
const menu = document.getElementById("menu")
const btn = document.getElementById("btn")
const colorMain = document.getElementById("color-main")
const hexMain = document.getElementById("hex-main")

function foo(i){
    let divs = document.getElementsByTagName('div')
    document.getElementById("custom-tooltip").style.display = "inline";
    setTimeout( function() {
        document.getElementById("custom-tooltip").style.display = "none";
    }, 1000);
    navigator.clipboard.writeText(divs[i+7].textContent.substring(0,7))

}

btn.addEventListener("click", function(e){  
    e.preventDefault() 
    let hex = colotInput.value.substr(1)
    let mode = menu.value
    colorMain.innerHTML = ""
    hexMain.innerHTML = ""
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${mode}&count=5`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
        .then(res => res.json())
        .then(data => {
            for(let i=0; i<5; i++){
                colorMain.innerHTML += `<div class="col color" onclick = "foo(${i})"></div>`
                document.getElementsByClassName("color")[i].style.background = data.colors[i].hex.value
                hexMain.innerHTML += `<div class="col white" onclick = "foo(${i})">${data.colors[i].hex.value}
                </div>`              
            }
                        
        })   
})

hexMain.addEventListener("click", function(){
    
})