let dados = [];


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

function cardRender(cardData) {
    const article = document.createElement('article');

    article.innerHTML = `
        <h2>${cardData.name}</h2>
        <p>${cardData.description}</p>
        <a href="${cardData.link}">Link</a>
    `;

     return article;
}


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

}

document.addEventListener('DOMContentLoaded', loadData);  
