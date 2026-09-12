document.addEventListener('DOMContentLoaded', () => {
  // Seleção dos elementos do DOM
  const form = document.getElementById('add-form');
  const input = document.getElementById('item-input');
  const shoppingList = document.getElementById('shopping-list');
  const alertBanner = document.getElementById('alert-banner');
  const btnCloseAlert = document.getElementById('btn-close-alert');

  // Itens pré-cadastrados para inicializar a lista
  const initialItems = ['Pão de forma', 'Café preto', 'Suco de Laranja', 'Bolacha'];

  // Função para criar um item na lista DOM
  function createListItem(text) {
    const li = document.createElement('li');
    li.classList.add('list-item');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        itemSpan.style.textDecoration = 'line-through';
        itemSpan.style.opacity = '0.5';
      } else {
        itemSpan.style.textDecoration = 'none';
        itemSpan.style.opacity = '1';
      }
    });

    // Nome do item
    const itemSpan = document.createElement('span');
    itemSpan.classList.add('item-text');
    itemSpan.textContent = text;

    // Botão de remover (Lixeira)
    const btnDelete = document.createElement('button');
    btnDelete.type = 'button';
    btnDelete.classList.add('btn-delete');
    
    // Ícone de lixeira em SVG
    btnDelete.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4H14M5.33333 4V2.66667C5.33333 2.29848 5.63181 2 6 2H10C10.3682 2 10.6667 2.29848 10.6667 2.66667V4M12.6667 4V13.3333C12.6667 13.7015 12.3682 14 12 14H4C3.63181 14 3.33333 13.7015 3.33333 13.3333V4H12.6667Z" stroke="#C93847" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    // Evento para remover item
    btnDelete.addEventListener('click', () => {
      li.remove();
      showAlert();
    });

    // Montar a estrutura da li
    li.appendChild(checkbox);
    li.appendChild(itemSpan);
    li.appendChild(btnDelete);

    return li;
  }

  // Renderizar os itens pré-cadastrados
  initialItems.forEach(itemText => {
    const itemElement = createListItem(itemText);
    shoppingList.appendChild(itemElement);
  });

  // Evento de submit do formulário
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newItemText = input.value.trim();

    // Validação: não adiciona se estiver vazio
    if (newItemText === '') {
      return;
    }

    // Criar e adicionar o novo item
    const itemElement = createListItem(newItemText);
    shoppingList.appendChild(itemElement);

    // Limpar o campo de texto
    input.value = '';
    input.focus();
  });

  // Função para exibir o alerta de remoção
  function showAlert() {
    alertBanner.style.display = 'flex';
    
    // Ocultar automaticamente após 3 segundos
    setTimeout(() => {
      alertBanner.style.display = 'none';
    }, 3000);
  }

  // Fechar o alerta manualmente ao clicar no botão 'X'
  btnCloseAlert.addEventListener('click', () => {
    alertBanner.style.display = 'none';
  });
});