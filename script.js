// Caixa de mensagem //

const chatMensagens = document.getElementById("chat-mensagem");
const mensagemInput = document.getElementById("caixa-de-texto");
const enviarMensagem = document.getElementById("enviar-mensagem");

//nome de usuário
let nomeDeUsuario = 'Você'

enviarMensagem.addEventListener('click', () => {
    const mensagemTexto = mensagemInput.value.trim(); 

    if (mensagemTexto !== "") {
        const novaMensagem = document.createElement('p');
        novaMensagem.textContent = ` ${nomeDeUsuario}: ${mensagemTexto}`;
        chatMensagens.appendChild(novaMensagem);
        mensagemInput.value = "";
    }
});