// Variáveis globais
let visor = document.getElementById('visor');
let historico = document.getElementById('historico');

// Função para adicionar input ao visor
function adicionarInput(valor) {
    const ultimoCaractere = visor.innerText.slice(-1);

    if (visor.innerText === '0' && valor !== '.') {
        visor.innerText = valor;
    } else if (valor === '.' && visor.innerText.split(/[+\-*/]/).pop().includes('.')) {
        return; // Impede múltiplos pontos no mesmo número
    } else if ("+-*/".includes(valor) && "+-*/".includes(ultimoCaractere)) {
        visor.innerText = visor.innerText.slice(0, -1) + valor;
    } else {
        visor.innerText += valor;
    }
}

// Limpa visor
function limpar() {
    visor.innerText = '0';
}

// Apaga último caractere
function apagarUltimoDigito() {
    visor.innerText = visor.innerText.length > 1
        ? visor.innerText.slice(0, -1)
        : '0';
}

// Calcula resultado
function calcular() {
    try {
        const resultado = eval(visor.innerText);
        adicionarAoHistorico(visor.innerText, resultado);
        visor.innerText = resultado;
    } catch {
        visor.innerText = 'Erro';
    }
}

// Adiciona resultado ao histórico e permite reutilização correta dos valores
function adicionarAoHistorico(expressao, resultado) {
    const horario = new Date().toLocaleTimeString();
    const item = document.createElement('li');
    item.innerText = `${horario} - ${expressao} = ${resultado}`;
    item.onclick = () => inserirValorDoHistorico(resultado);

    historico.prepend(item);
    if (historico.children.length > 4) historico.removeChild(historico.lastChild);
}

// Insere valores do histórico corretamente sem sobrescrever o visor
function inserirValorDoHistorico(valor) {
    if (visor.innerText === '0' || visor.innerText === 'Erro') {
        visor.innerText = valor.toString();
    } else {
        const ultimoCaractere = visor.innerText.slice(-1);
        if ("+-*/".includes(ultimoCaractere)) {
            visor.innerText += valor.toString();
        } else {
            visor.innerText += `+${valor}`; // Adiciona operador automaticamente se necessário
        }
    }
}