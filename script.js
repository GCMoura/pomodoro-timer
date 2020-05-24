//menu deslizante no mobile
const navBar = document.querySelectorAll('.nav-bar')[0]
const menu = document.querySelector('.menu')
const clickMenu = document.querySelector('.title')

clickMenu.addEventListener('click', toggleClassMenu, false)

var isOpen = false

function toggleClassMenu(){
    if(isOpen == false){
        navBar.classList.add("menu-open")
        menu.firstElementChild.classList.add('hamburguer-x')
        isOpen = true
    }
    else {
        navBar.classList.remove('menu-open')
        menu.firstElementChild.classList.remove('hamburguer-x')
        isOpen = false
    }
}

//funcionamento do audio
const soundBtn = document.querySelectorAll('.nav-btn')
var forest = document.querySelector('.forest')
var sea = document.querySelector('.sea')
var jazz = document.querySelector('.jazz')
var rain = document.querySelector('.rain')
var peace = document.querySelector('.peace')
var silence = document.querySelector('.silence')
var beep = document.querySelector('.beep')
var soundPlay = ''

soundBtn.forEach(btn => {
    btn.addEventListener('click', function(){playSound(btn.children[0].classList.value)}, false)
})
// função para o tocar o audio selecionado
function playSound(sound){
    if(soundPlay == ''){
        soundPlay = silence
        soundPlay.play()
    }
    if(sound == "forest"){
        soundPlay.pause()
        soundPlay = forest
        soundPlay.play()
    } 
    if(sound == "sea"){
        soundPlay.pause()
        soundPlay = sea
        soundPlay.play()
    } 
    if(sound == "jazz"){
        soundPlay.pause()
        soundPlay = jazz
        soundPlay.play()
    } 
    if(sound == "rain"){
        soundPlay.pause()
        soundPlay = rain
        soundPlay.play()
    } 
    if(sound == "peace"){
        soundPlay.pause()
        soundPlay = peace
        soundPlay.play()
    } 
    if(sound == "silence"){
        soundPlay.pause()
        soundPlay = silence
        soundPlay.play()
    } 
}

//incrementar e decrementar tempo de trabalho e mostrar no tempo principal
var inputWorkTime = document.querySelector('.work-time-number')
const btnWorkPlus = document.querySelector('.work-time-arrow-up')
const btnWorkMinus = document.querySelector('.work-time-arrow-down')
const inputClock = document.querySelector('.input-clock')
var inputWorkValue = parseInt(inputWorkTime.value)
inputClock.value = inputWorkValue //mostra o tempo inicial no timer principal

btnWorkPlus.addEventListener('click', workTimePlus, false)

function workTimePlus(){   
    inputWorkValue +=1
    inputWorkTime.value = inputWorkValue
    inputClock.value = inputWorkValue
    if(inputWorkValue == 30){
        btnWorkPlus.disabled = true
    }
    if(inputWorkValue > 0){
        btnWorkMinus.disabled = false
    }
}

btnWorkMinus.addEventListener('click', workTimeMinus, false)

function workTimeMinus(){
    inputWorkValue = parseInt(inputWorkTime.value)
    if(inputWorkValue == 0){
        btnWorkMinus.disabled = true
    } else {
        inputWorkValue -= 1
        inputClock.value = inputWorkValue //atualiza o timer principal quando mexer no tempo de trabalho
    }
    inputWorkTime.value = inputWorkValue
    if(inputWorkValue < 30){
        btnWorkPlus.disabled = false
    }
}

//incrementar e decrementar tempo de relaxamento
var inputRelaxTime = document.querySelector('.relax-time-number')
const btnRelaxPlus = document.querySelector('.relax-time-arrow-up')
const btnRelaxMinus = document.querySelector('.relax-time-arrow-down')
var inputRelaxValue = parseInt(inputRelaxTime.value)

btnRelaxPlus.addEventListener('click', relaxTimePlus, false)

function relaxTimePlus(){
    inputRelaxValue += 1
    inputRelaxTime.value = inputRelaxValue
    if(inputRelaxValue == 15){
        btnRelaxPlus.disabled = true
    }
    if(inputRelaxValue > 0){
        btnRelaxMinus.disabled = false
    }
}

btnRelaxMinus.addEventListener('click', relaxTimeMinus, false)

function relaxTimeMinus(){
    inputRelaxValue = parseInt(inputRelaxTime.value)
    if(inputRelaxValue == 0){
        btnRelaxMinus.disabled = true
    } else {
        inputRelaxValue -= 1
    }
    inputRelaxTime.value = inputRelaxValue
    if(inputRelaxValue < 15){
        btnRelaxPlus.disabled = false
    }
}

//funcionamento do play e do pause e funcionamento do tempo de relaxamento
const playBtn = document.querySelector('.play')
const pauseBtn = document.querySelector('.pause')
var play
var relax
const clockStyle = document.querySelector('.clock')
const clockNumber = document.querySelector('.input-clock')

playBtn.addEventListener('click', playClock, false)

function playClock(){
    inputClock.value = inputClock.value // continua o timer de onde parou após o pause
    play = setInterval(() => {
        if(inputClock.value == 0){ //terminou o tempo de trabalho e começa o tempo de relaxamento
            clearInterval(play)
            if(soundPlay != ""){ //se algum som estiver tocando, pausa
                soundPlay.pause()
            }
            beep.play()
            playBtn.disabled = true
            pauseBtn.disabled = true
            relaxTimer()
        } else {
            inputClock.value -= 1
            if(soundPlay != ""){  //se algum som estiver tocando, toca
                soundPlay.play()
            }
        }
    }, 60000); //por minuto
}

pauseBtn.addEventListener('click', pauseClock, false)

function pauseClock(){
    clearInterval(play)
    if(soundPlay != ""){  //se algum som estiver tocando, pausa
        soundPlay.pause()
    }
}

//funcionamento do tempo de relaxamento
function relaxTimer(){
    clockStyle.style.border = "5px solid red"
    clockNumber.style.color = "red"
    playBtn.style.color = "red"
    pauseBtn.style.color = "red"
    inputClock.value = inputRelaxValue //timer principal recebe o tempo de relaxamento para decrementar

    relax = setInterval(() => {
        if(inputClock.value == 0){ //se 0 acabou o tempo de relaxamento
            clockStyle.style.border = "5px solid green"
            clockNumber.style.color = "green"
            playBtn.style.color = "green"
            pauseBtn.style.color = "green"
            inputClock.value = inputWorkValue // timer principal recebe o tempo de trabalho novamente
            clearInterval(relax)
            playBtn.disabled = false
            pauseBtn.disabled = false
        } else {
            inputClock.value -= 1
            if(soundPlay != ""){ //se algum som estiver tocando, pausa
                soundPlay.pause()
            }
        }
    }, 60000) //por minuto
}