let dolar = 0 // cotação será carregada via API
let usdInput = document.querySelector("#usd")
let brlInput = document.querySelector("#brl")
let cotacaoInfo = document.querySelector("#cotacao")

// eventos para digitação nos campos
usdInput.addEventListener('keyup', () => {
    convert('usd-to-brl')
})

brlInput.addEventListener('keyup', () => {
    convert('brl-to-usd')
})

// eventos para formatar ao sair do campo
usdInput.addEventListener('blur', () => {
    usdInput.value = formatCurrency(usdInput.value)
})

brlInput.addEventListener('blur', () => {
    brlInput.value = formatCurrency(brlInput.value)
})

// buscar cotação do dólar via API
fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
    .then(response => response.json())
    .then(data => {
        dolar = parseFloat(data.USDBRL.bid) // pega o valor da cotação
        console.log("Cotação atual do dólar:", dolar)

        cotacaoInfo.textContent = `Cotação atual: 1 USD = R$ ${dolar.toFixed(2)}`
        
        usdInput.value = "1000,00"
        convert('usd-to-brl')
    })
    .catch(error => {
        console.error("Erro ao buscar cotação do dólar:", error)
        alert("Erro ao obter a cotação. Usando valor padrão R$5.74.")

        dolar = 5.74
        cotacaoInfo.textContent = `Cotação padrão usada: 1 USD = R$ ${dolar.toFixed(2)}`
        
        usdInput.value = "1000,00"
        convert('usd-to-brl')
    })

// formata número para estilo monetário brasileiro
function formatCurrency(value) {
    let fixedValue = fixValue(value) // ajustar o valor
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2
    }
    let formatter = new Intl.NumberFormat("pt-BR", options)
    return formatter.format(fixedValue)
}

// corrige vírgula/ponto e transforma string em número
function fixValue(value) {
    let fixedValue = value.replace(",", ".")
    let floatValue = parseFloat(fixedValue)
    return isNaN(floatValue) ? 0 : floatValue
}

// realiza a conversão de valores
function convert(type) {
    if (dolar <= 0) return // se ainda não carregou a cotação, não converte

    if (type == 'usd-to-brl') {
        let fixedValue = fixValue(usdInput.value)
        let result = (fixedValue * dolar).toFixed(2)
        brlInput.value = formatCurrency(result)
    }

    if (type == 'brl-to-usd') {
        let fixedValue = fixValue(brlInput.value)
        let result = (fixedValue / dolar).toFixed(2)
        usdInput.value = formatCurrency(result)
    }
}
