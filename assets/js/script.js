// Seleciona todos os links do menu que começam com #
const menuLinks = document.querySelectorAll('.navbar nav a[href^="#"]');

menuLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Remove o comportamento padrão de "pulo" brusco
        event.preventDefault();
        
        // Pega o ID para onde o link aponta
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Faz a rolagem suave perfeita via script
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // (Opcional) Atualiza a URL do navegador sem dar o tranco visual
            history.pushState(null, null, targetId);
        }
    });
});

document.getElementById('wpp-form').addEventListener('submit', function(event) {
    // Impede o formulário de recarregar a página antes do envio
    event.preventDefault();

    // 1. Configura o número de telefone do WhatsApp (com código do país, sem espaços ou caracteres especiais)
    const numeroWhatsApp = "5541996614746"; 

    // 2. Captura os valores digitados pelo usuário
    const nome = document.getElementById('form-name').value;
    const telefone = document.getElementById('form-phone').value;
    const email = document.getElementById('form-email').value;
    const servico = document.getElementById('form-service').value || "Não informado";
    const mensagem = document.getElementById('form-message').value || "Sem observações adicionais.";

    // 3. Monta o texto da mensagem organizando as quebras de linha com o '%0A'
    let textoMensagem = `*Nova Solicitação de Orçamento - On Safe*%0A%0A`;
    textoMensagem += `*Nome:* ${nome}%0A`;
    textoMensagem += `*Telefone:* ${telefone}%0A`;
    textoMensagem += `*E-mail:* ${email}%0A`;
    textoMensagem += `*Serviço Desejado:* ${servico}%0A%0A`;
    textoMensagem += `*Detalhes do Projeto:*%0A${mensagem}`;

    // 4. Cria o link final da API do WhatsApp
    const linkFinal = `https://wa.me/${numeroWhatsApp}?text=${textoMensagem}`;

    // 5. Abre o WhatsApp em uma nova aba (aplicativo no celular ou WhatsApp Web no PC)
    window.open(linkFinal, '_blank');
});

const inputPhone = document.getElementById('form-phone');

if (inputPhone) {
    inputPhone.addEventListener('input', function(event) {
        let value = event.target.value;

        // Remove tudo o que não for número
        value = value.replace(/\D/g, "");

        // Aplica a formatação dinamicamente conforme a quantidade de números
        if (value.length > 0) {
            value = "(" + value;
        }
        if (value.length > 3) {
            value = value.slice(0, 3) + ") " + value.slice(3);
        }
        if (value.length > 10) {
            // Se tiver 11 dígitos (celular com 9), põe o hífen na posição correta
            value = value.slice(0, 10) + "-" + value.slice(10, 14);
        } else if (value.length > 6) {
            // Ajuste temporário de hífen enquanto digita
            value = value.slice(0, 9) + "-" + value.slice(9);
        }

        // Devolve o valor formatado para o input
        event.target.value = value;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1, // 1 slide por vez no mobile
        spaceBetween: 30, // Espaço entre os cards
        loop: true,       // Carrossel infinito
        autoplay: {
            delay: 3500,  // Passa automaticamente a cada 3.5 segundos
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            // Quando a tela for maior que 768px (Desktop)
            768: {
                slidesPerView: 3, // Mostra 3 cards ao mesmo tempo
            },
        },
    });
});