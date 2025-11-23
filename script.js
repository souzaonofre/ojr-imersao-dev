let dados = [];


/**
 * Carrega os dados do arquivo JSON
 * 
 * @async
 * @function
 * @name loadData
 * @kind function
 * @returns {Promise<boolean>}
 */
async function loadData() {
    const resp = await fetch("data.json");

    if (!resp.ok) {
        dados = [];
        console.error("Erro ao tentar buscar dados");
        return false;
    }
    
    dados = await resp.json();
    if ((Array.isArray(dados) === false && typeof dados !== 'object') || dados.length === 0) {
        dados = [];
        console.error("Nenhum dado encontrado");
        return false;
    }

    console.log("Dados carregados com sucesso");
    return true;
}

/**
 * Renderiza um card com as informações de uma linguagem de programação
 * 
 * @function
 * @name cardRender
 * @kind function
 * @param {Object} cardData - Dados da linguagem de programação
 * @returns {HTMLElement} Elemento HTML do card
 */
function cardRender(cardData) {
    const article = document.createElement('article');
    article.classList.add('card');

    article.innerHTML = `
        <h2>${cardData.name}</h2>
        <p>${cardData.description}</p>
        <a href="${cardData.link}" target="_blank">Saiba mais</a>
    `;

    return article;
}

/**
 * Carrega a lista de cards
 * 
 * @function
 * @name loadCardList
 * @kind function
 * @param {Array<Object>} cardList - Lista de cards
 * @param {HTMLElement} root - Elemento HTML onde os cards serão renderizados
 */
function loadCardList(cardList, root) {
    if (!root || (root instanceof HTMLSectionElement) === false) {
        root = document.querySelector('main > section');
    }
    
    root.innerHTML = '';
    
    cardList.forEach(cardData => {
        root.insertAdjacentElement('beforeend', cardRender(cardData));
    });
}

/**
 * Inicia a busca de cards
 * 
 * @function
 * @name iniciarBusca
 * @kind function
 */
function iniciarBusca() {
    const ipt = document.querySelector('#input-busca');
    if (ipt.value === '') {
        window.alert("Por favor, insira um nome para buscar");
        return;
    }

    if (dados.length === 0 || loadData() === false) {
        console.error("Nenhum dado encontrado");
        return;
    }

    const iptValue = ipt.value.toLowerCase();
    const cardName = cardData.name.toLowerCase();
    const cardAlias = cardData.alias.toLowerCase();

    const filteredData = dados.filter(cardData => cardName.includes(iptValue) || cardAlias.includes(iptValue));
    loadCardList(filteredData);
}

document.addEventListener('DOMContentLoaded', loadData);  
