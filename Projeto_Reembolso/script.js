// Selecionar os elementos do formulário.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")

// captura o input para formatar valores
amount.oninput = () => {
    // obtem o valor atual e remove os caracteres não numéricos
    let value = amount.value.replace(/\D/g, "")

    //transforma o valor em centavos
    value = Number(value) / 100

    // atualiza o input
    amount.value = formatCurrencyBRL(value)
}
// Função para formatar valores como moeda brasileira
function formatCurrencyBRL(value) {
    // Formata o valor como moeda brasileira (R$)
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    return value
}
// Captura o submit para obter valores
form.onsubmit = (event) => {
    // previne reload da pagina
    event.preventDefault()
    // cria objeto com detalhes da despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    // chama função para adicionar item na lista
    expenseAdd(newExpense)
}
// Adiciona novo item na lista de despesas
function expenseAdd(newExpense) {
    try{
        // cria o elemento para a lista
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")
        
        // Cria o icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //Cria informações da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Cria categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Adiciona nome e categoria na div de informações
        expenseInfo.append(expenseName, expenseCategory)

        // Cria o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML =`<small>R$<small> ${newExpense.amount.toUpperCase().replace("R$", "")}`

        // Cria o botão de remover
        const removeButton = document.createElement("img")
        removeButton.classList.add("remove-icon")
        removeButton.setAttribute("src", "img/remove.svg")
        removeButton.setAttribute("alt", "remover")


        // Adiciona as informacões no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeButton )

        // Adiciona o item na lista
        expenseList.append(expenseItem)

        // Limpa os campos do formulário
        formClear()

        // Atualiza totais da lista
        updateTotals()
    } catch (error) {
        alert("Erro ao adicionar despesa. Por favor, tente novamente.")
        console.error("Erro ao adicionar despesa:", error)
    }
}
//Atualiza os totais
function updateTotals() {
    try {
        // Recupera todos os itens (li) da lista de despesas(ul)
        const items = expenseList.children

        // Atualiza a quantidade de itens da lista
        expenseQuantity.textContent = `${items.length} ${items.length === 1 ? "despesa" : "despesas"}`
        console.log(items)

        // variavel para incrementar o total
        let total = 0

        // percorre todos os itens da lista
        for (let i = 0; i < items.length; i++) {
            // seleciona o valor da despesa do item atual
            const itemAmount = items[i].querySelector(".expense-amount")
            // remove caracteres não numéricos e substitui vírgula por ponto
            let value = Number(itemAmount.textContent.replace(/\D/g, ""))/100
            if (isNaN(value)) {
                return alert("Erro ao calcular o total. Por favor, verifique os valores das despesas.")
            }
            total += Number(value)
        }
        // Cria o simbolo R$ formatado
        const symbolBRL = document.createElement("small")
        symbolBRL.textContent = "R$"
        // Formata o valor e remove o R$ que será customizado
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")
        // Limpa conteudo do elemento
        expenseTotal.innerHTML = ""
        // Adiciona o simbolo e o valor formatado
        expenseTotal.append(symbolBRL, total)
    } catch (error) {
        alert("Erro ao atualizar totais. Por favor, tente novamente.")
        console.error("Erro ao atualizar totais:", error)
    }
}
// Evento que captura clique na lista
expenseList.addEventListener("click", (event) => {
    // Verifica se o elemento clicado é o botão de remover
    if (event.target.classList.contains("remove-icon")) {
        // Seleciona o item pai (li) do botão clicado
        const expenseItem = event.target.closest(".expense")
        // Remove o item da lista
        expenseItem.remove()
        // Atualiza os totais após a remoção
        updateTotals()
    }
}) 

function formClear() {
    // Limpa os campos do formulário
    expense.value = ""
    category.value = ""
    amount.value = ""
    // coloca foco no input de despesa
    expense.focus()
}