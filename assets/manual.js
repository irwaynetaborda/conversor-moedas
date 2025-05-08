// Tipos de Variáveis:
let idade = 18 // tipo number
let nome = 'Irwayne' // tipo string
let logado = false // tipo boolean

// Array e Objetos
let ingredientes = ["farinha", "agua", "sal", "corante"] // array list
let personagem = { // objeto com propriedades
    nome: "Irwayne",
    nivel: 10,
    forca: 800,
    magia: 200,
    vida: 1000,
    mana: 200
}   // console.log(personagem.mana)

// Função
function somar(a, b) {
    let resultado = a + b
    return resultado
}

let somar2 = (a, b) => { // Função Seta
    let resultado = a + b
    return resultado
}

// Condicionais
if (idade >= 18) {
    console.log('Voce é maior de idade')
} else {
    console.log('Voce é menor de idade')
}

// Loop
let lista = [10, 20, 30, 40]
for (let item of lista) {
    console.log("- Numero da lista: "+ item)
}