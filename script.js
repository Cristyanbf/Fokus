const html = document.querySelector('html');
const focoBT = document.querySelector('.app__card-button--foco');
const curtoBT = document.querySelector('.app__card-button--curto');
const longoBT = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const startOuPauseBt = document.querySelector('#start-pause span');
const imagemBT = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio ('/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500; 
let intervaloId = null;


musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    }else{
        musica.pause();
    }
})


focoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
   alterarContexto('foco')
   focoBT.classList.add('active')
})

curtoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBT.classList.add('active')
 })

 longoBT.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBT.classList.add('active')
 })

 function alterarContexto (contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    mostrarTempo()
    html.setAttribute( 'data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
        `
            break;

        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada? <br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `
            break;

        case 'descanso-longo': 
        titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong"> Faça uma pausa longa.</strong>
        `
            break;
    
        default:
            break;
    }
 }

 const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play()   // áudio executado quando cronômetro finalizar
        alert('Tempo finalizado!')
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('focoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play()   // áudio executado quando cronômetro for pausado
        zerar()
        return
    }
    audioPlay.play()   // áudio executado quando cronômetro iniciar
    intervaloId = setInterval(contagemRegressiva, 1000)
    startOuPauseBt.textContent = "Pausar"
    imagemBT.setAttribute('src', '/imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId) 
    startOuPauseBt.textContent = "Começar"
    imagemBT.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date (tempoDecorridoEmSegundos * 1000)
    const TempoFormatado = tempo.toLocaleTimeString('pt-Br',{minute:'2-digit', second:'2-digit'})
    tempoNaTela.innerHTML = `${TempoFormatado}`
}
mostrarTempo()