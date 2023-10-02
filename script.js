document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const chatMensagens = document.querySelector('.mensagens');
    const mensagemInput = document.getElementById('caixa-de-texto');
    const enviarMensagem = document.getElementById('enviar-mensagem');

    enviarMensagem.addEventListener('click', () => {
        const mensagemTexto = mensagemInput.value.trim();

        if (mensagemTexto !== "") {
            socket.emit('mensagem', mensagemTexto);
            mensagemInput.value = "";
        }
    });

    socket.on('mensagem', (mensagem) => {
        const novaMensagem = document.createElement('div');
        novaMensagem.textContent = mensagem;
        chatMensagens.appendChild(novaMensagem);
    });
});
// Caixa de mensagem //
const chatMensagens = document.getElementById("chat-mensagem");
const mensagemInput = document.getElementById("caixa-de-texto");
const enviarMensagem = document.getElementById("enviar-mensagem");

// Data e hora //

// Obtém a data e hora atual
let dataHoraAtual = new Date();
        
// Obtém a hora, minutos, segundos e dia
let horas = dataHoraAtual.getHours();
let minutos = dataHoraAtual.getMinutes();
let dia = dataHoraAtual.getDate();

// Formata a data e hora como uma string legível
const dataHoraFormatada = `${dia}/${dataHoraAtual.getMonth() + 1} às ${horas}:${minutos}`;


// Nome de usuário //
let nomeDeUsuario = 'Você';

// Caminho da imagem de perfil //
const urlImagemPerfil = 'midias/perfil-nulo.png';

// Função para criar uma nova mensagem //
function criarMensagem(texto) {

    const novaMensagem = document.createElement('div');
    novaMensagem.className = "mensagem";
    novaMensagem.id = "mensagem-area";

    // Crie um elemento de imagem para a foto de perfil
    const imagemPerfil = document.createElement('img');
    imagemPerfil.src = urlImagemPerfil; // Configura o atributo src com o caminho da imagem
    imagemPerfil.id = 'imagem-perfil-mensagem';
    imagemPerfil.alt = "Imagem de perfil"; // Configura o atributo alt

    // Crie um elemento de parágrafo para o texto da mensagem
    const mensagemTexto = document.createElement('p');
    mensagemTexto.innerHTML = `${nomeDeUsuario}:  <br>  ${texto} <br> <br> Enviado: ${dataHoraFormatada}`;

    mensagemTexto.id = "mensagem-texto";

    const opcoesMensagem = document.createElement('button');
    opcoesMensagem.innerHTML = "Comentar";
    opcoesMensagem.className = "botaoResponder";
    opcoesMensagem.id = "botao-responder";
    
    novaMensagem.appendChild(imagemPerfil); // Adicione a imagem de perfil à mensagem
    novaMensagem.appendChild(mensagemTexto);
    novaMensagem.appendChild(opcoesMensagem);

    // Adiciona um ouvinte de evento ao botão de resposta para esta mensagem
    opcoesMensagem.addEventListener('click', responderMensagem);
    
    return novaMensagem;
}

// Função para responder a uma mensagem //
// Função para responder a uma mensagem //
// Função para responder a uma mensagem //
function responderMensagem() {
    const mensagemPai = this.closest('.mensagem');
    if (mensagemPai) {
        // Verifique se já existe uma caixa de resposta para esta mensagem //
        if (!mensagemPai.querySelector('input[type="text"]')) {
            // Crie um novo input de texto para a resposta //
            const novoInput = document.createElement('input');
            novoInput.type = 'text';
            novoInput.placeholder = 'Digite sua resposta';
            novoInput.id = "escreva-resposta";

            // Crie um botão para enviar a resposta //
            const botaoEnviar = document.createElement('button');
            botaoEnviar.innerHTML = 'Enviar';
            botaoEnviar.id = "enviar-resposta";

            // Adicione um ouvinte de evento ao botão de enviar para processar a resposta //
            botaoEnviar.addEventListener('click', function() {
                const respostaTexto = novoInput.value.trim();
                if (respostaTexto !== "") {
                    // Crie uma nova mensagem de resposta //
                    const respostaMensagem = document.createElement('div');
                    respostaMensagem.className = "mensagem";
                    respostaMensagem.id = "mensagem-area";

                    // Crie um elemento de imagem para a foto de perfil na resposta
                    const imagemPerfilResposta = document.createElement('img');
                    imagemPerfilResposta.src = urlImagemPerfil; // Caminho da imagem de perfil
                    imagemPerfilResposta.id = 'imagem-perfil-resposta';
                    imagemPerfilResposta.alt = "Imagem de perfil"; // Texto alternativo

                    // Crie um elemento de parágrafo para o texto da resposta
                    const respostaTextoElement = document.createElement('p');
                    respostaTextoElement.innerHTML = `${nomeDeUsuario} Respondeu: ${respostaTexto}  <br> <br> Enviado: ${dataHoraFormatada}`;
                    respostaTextoElement.id = "resposta-texto";

                    respostaMensagem.appendChild(imagemPerfilResposta); // Adicione a imagem de perfil à resposta
                    respostaMensagem.appendChild(respostaTextoElement);

                    // Adicione a mensagem de resposta à mensagem pai da qual ela faz parte //
                    mensagemPai.appendChild(respostaMensagem);

                    // Limpe o input de resposta e remova os elementos de entrada e botão de envio //
                    novoInput.value = "";
                    novoInput.parentNode.removeChild(novoInput);
                    botaoEnviar.parentNode.removeChild(botaoEnviar);
                }
            });

            // Adicione o input de resposta e o botão de envio à mensagem pai //
            mensagemPai.appendChild(novoInput);
            mensagemPai.appendChild(botaoEnviar);
        }
    }
}

// Enviando uma mensagem //
enviarMensagem.addEventListener('click', () => {
    const mensagemTexto = mensagemInput.value.trim(); 

    if (mensagemTexto !== "") {
        // Crie uma nova mensagem e adicione-a à caixa de mensagens
        const novaMensagem = criarMensagem(mensagemTexto);
        chatMensagens.appendChild(novaMensagem);

        // Limpe o campo de texto de entrada
        mensagemInput.value = "";
    }
});