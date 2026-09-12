console.log("Script conectado")
// cotação moedas
const USD = 5.12
const EUR = 5.95
const GBP = 6.93


// Obtendo os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// manipulando input para receber apenas numeros
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Capturando o submit do formulario
form.onsubmit = (event) => {
    event.preventDefault()
    switch (currency.value){
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break
    }

}

// Função para converter moeda
function convertCurrency(amount, price, symbol){
    try{
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        let total = amount*price
        // verifica se resultado não é um número
        if(isNaN(total)){
            return alert("Por favor, digite o valor corretamente para converter")
        }
        result.textContent = `${formatCurrencyBRL(total).replace("R$", "")} reais`
        // exibe footer com resultado
        footer.classList.add("show-result")

        // Atualizando cotação
    } catch(error){
        // remove footer
        footer.classList.remove("show-result")

        console.log(error)
        alert("Não foi possível converter. Tente mais tarde!")
    }
    console.log(amount, price, symbol)
}
// formata em BRL
function formatCurrencyBRL(value){
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}