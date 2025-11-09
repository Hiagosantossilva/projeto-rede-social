// Espera o carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const chatMensagens = document.getElementById('chat-mensagem');
    const mensagemInput = document.getElementById('caixa-de-texto');
    const enviarMensagem = document.getElementById('enviar-mensagem');

    // Enviar mensagem via socket
    enviarMensagem.addEventListener('click', () => {
        const mensagemTexto = mensagemInput.value.trim();

        if (mensagemTexto !== "") {
            socket.emit('mensagem', mensagemTexto);
            mensagemInput.value = "";
        }
    });

    // Receber mensagens do servidor
    socket.on('mensagem', (mensagem) => {
        const novaMensagem = document.createElement('div');
        novaMensagem.textContent = mensagem;

        // Mensagem nova aparece no topo
        chatMensagens.prepend(novaMensagem);
    });
});

// =============================
// Configurações locais do chat
// =============================
const chatMensagens = document.getElementById("chat-mensagem");
const mensagemInput = document.getElementById("caixa-de-texto");
const enviarMensagem = document.getElementById("enviar-mensagem");

// Data e hora formatadas
function gerarDataHora() {
    const dataHoraAtual = new Date();
    const dia = dataHoraAtual.getDate();
    const horas = dataHoraAtual.getHours();
    const minutos = String(dataHoraAtual.getMinutes()).padStart(2, "0");
    return `${dia}/${dataHoraAtual.getMonth() + 1} às ${horas}:${minutos}`;
}

// Nome e avatar do usuário
const nomeDeUsuario = 'Você';
const urlImagemPerfil = 'midias/perfil-nulo.png';

// =============================
// Criação de mensagens
// =============================
function criarMensagem(texto) {
    const novaMensagem = document.createElement('div');
    novaMensagem.className = "mensagem";
    novaMensagem.id = "mensagem-area";

    const imagemPerfil = document.createElement('img');
    imagemPerfil.src = urlImagemPerfil;
    imagemPerfil.id = 'imagem-perfil-mensagem';
    imagemPerfil.alt = "Imagem de perfil";

    const mensagemTexto = document.createElement('p');
    mensagemTexto.id = "mensagem-texto";
    mensagemTexto.innerHTML = `${nomeDeUsuario}: <br>${texto}<br><br>Enviado: ${gerarDataHora()}`;

    const botaoComentar = document.createElement('button');
    botaoComentar.innerHTML = "Comentar";
    botaoComentar.className = "botaoResponder";
    botaoComentar.id = "botao-responder";
    botaoComentar.addEventListener('click', responderMensagem);

    novaMensagem.appendChild(imagemPerfil);
    novaMensagem.appendChild(mensagemTexto);
    novaMensagem.appendChild(botaoComentar);

    return novaMensagem;
}

// =============================
// Responder mensagem
// =============================
function responderMensagem() {
    const mensagemPai = this.closest('.mensagem');

    if (mensagemPai && !mensagemPai.querySelector('input[type="text"]')) {
        const novoInput = document.createElement('input');
        novoInput.type = 'text';
        novoInput.placeholder = 'Digite sua resposta';
        novoInput.id = "escreva-resposta";

        const botaoEnviar = document.createElement('button');
        botaoEnviar.innerHTML = 'Enviar';
        botaoEnviar.id = "enviar-resposta";

        botaoEnviar.addEventListener('click', () => {
            const respostaTexto = novoInput.value.trim();
            if (respostaTexto !== "") {
                const respostaMensagem = document.createElement('div');
                respostaMensagem.className = "mensagem";
                respostaMensagem.id = "mensagem-area";

                const imagemPerfilResposta = document.createElement('img');
                imagemPerfilResposta.src = urlImagemPerfil;
                imagemPerfilResposta.id = 'imagem-perfil-resposta';
                imagemPerfilResposta.alt = "Imagem de perfil";

                const respostaTextoElement = document.createElement('p');
                respostaTextoElement.id = "resposta-texto";
                respostaTextoElement.innerHTML = `${nomeDeUsuario} respondeu: ${respostaTexto}<br><br>Enviado: ${gerarDataHora()}`;

                respostaMensagem.appendChild(imagemPerfilResposta);
                respostaMensagem.appendChild(respostaTextoElement);

                mensagemPai.appendChild(respostaMensagem);
                novoInput.remove();
                botaoEnviar.remove();
            }
        });

        mensagemPai.appendChild(novoInput);
        mensagemPai.appendChild(botaoEnviar);
    }
}

// =============================
// Enviar mensagem local
// =============================
enviarMensagem.addEventListener('click', () => {
    const mensagemTexto = mensagemInput.value.trim();
    if (mensagemTexto !== "") {
        const novaMensagem = criarMensagem(mensagemTexto);

        // 🟢 NOVA MENSAGEM NO TOPO
        chatMensagens.prepend(novaMensagem);

        mensagemInput.value = "";
    }
});
