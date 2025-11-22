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


