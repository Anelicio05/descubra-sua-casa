import quiz from "./questoes.js";
const div = document.getElementById("pergutas")
const inicio = document.getElementById("inicio")
const play = document.getElementById("botao") 

const casasImagem = document.querySelectorAll(".img-casas")

play.addEventListener("click", ()=>{
    inicio.style.display = 'none'
    div.style.display = 'flex'
    mostraPergunta()
})

let armazenaResposta = []

function selecionaCasa(resposta) {
    let resultado
    for (let i = 0; i < quiz.length; i++) {
        const questoes = quiz[i].respostas
        questoes.forEach((e) => {
            if (e.opcao === resposta) {
                resultado = e.casa
            }
        })
    }

    armazenaResposta.push(resultado)

    return resultado
}

let i = 0 
function mostraPergunta() {
    const questao = quiz[i].questao
    const resposta = quiz[i].respostas

    div.innerHTML = ""
    resposta.forEach((r) => {
        div.innerHTML += `
                <button class="respostas">${r.opcao}</button>
            `
    })

    const botoes = div.querySelectorAll(".respostas");
    botoes.forEach((botao) => {
        botao.addEventListener("click", (b) => {
            selecionaCasa(b.target.innerHTML);
            
            i += 1
            if (i < quiz.length) {
                mostraPergunta()
            }else {
                casaEscolhida(armazenaResposta)
                div.style.display = "none"
            }
        })
    })
}
    
function casaEscolhida(casa) {
    let contagem = casa.reduce((contagem, palavra) => {
        contagem[palavra] = (contagem[palavra] || 0) + 1
        return contagem
    }, {})
    let palavraMaisFrequente = ''
    let contagemMaxima = 0

    for (let palavra in contagem) {
        if (contagem[palavra] > contagemMaxima) {
            contagemMaxima = contagem[palavra]
            palavraMaisFrequente = palavra
        }
    }

    casasImagem.forEach((img)=>{
        if(palavraMaisFrequente === img.id){
           const teste = document.getElementById(`${img.id}`).style.display = "flex"
           console.log(teste)
        }
    })

    

    return palavraMaisFrequente
}
