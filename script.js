document.addEventListener('DOMContentLoaded', () => {

    /**
     * Inicializa todas as funcionalidades do site.
     */
    function init() {
        initMenuHamburger();
        initCarrosselPortifolio();
        initBarrasHabilidade();
        initModalPortifolio();
        initValidacaoFormulario();
    }

    /**
     * Controla a abertura e fechamento do menu mobile (hamburger).
     */
    function initMenuHamburger() {
        const nav = document.getElementById('navegacao');
        const botaoAbrir = document.getElementById('botao-abrir-menu');
        const botaoFechar = document.getElementById('botao-fechar-menu');

        if (botaoAbrir && botaoFechar && nav) {
            botaoAbrir.onclick = () => {
                nav.classList.add('menu-ativo');
            }
            botaoFechar.onclick = () => {
                nav.classList.remove('menu-ativo');
            }
        }
    }

    /**
     * Inicializa o carrossel da página de portfólio.
     */
    function initCarrosselPortifolio() {
        if (document.querySelector('.swiper')) {
            const swiper = new Swiper('.swiper', {
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: true,
                },
                slidesPerView: 1,
                spaceBetween: 30,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    768: { slidesPerView: 2, spaceBetween: 30 },
                    1024: { slidesPerView: 3, spaceBetween: 30 }
                }
            });
        }
    }

    /**
     * Anima as barras de progresso na página de habilidades.
     */
    function initBarrasHabilidade() {
        const itensHabilidade = document.querySelectorAll('.item-habilidade');
        
        if (itensHabilidade.length > 0) {
            itensHabilidade.forEach(item => {
                const porcentagemTexto = item.querySelector('.habilidade-porcentagem')?.textContent; 
                const barraDePreenchimento = item.querySelector('.barra-preenchimento');
                
                if (porcentagemTexto && barraDePreenchimento) {
                    barraDePreenchimento.style.width = porcentagemTexto;
                }
            });
        }
    }

    /**
     * Controla a abertura e fechamento do modal de projetos.
     * (ATUALIZADO COM BOTÕES DE LINK)
     */
    function initModalPortifolio() {
        const modal = document.getElementById('modal-projeto');
        const fecharModal = document.getElementById('modal-fechar');
        const corpoModal = document.querySelector('.modal-corpo');
        const botoesVerMais = document.querySelectorAll('.botao-ver-mais');

        if (!modal || !fecharModal || !corpoModal) return;

        botoesVerMais.forEach(botao => {
            botao.onclick = () => {
                // Desestruturação dos dados do botão
                const { titulo, imagem, descricao, link, repo } = botao.dataset;
                
                // Monta o HTML do modal com os botões
                corpoModal.innerHTML = `
                    <h3 class="modal-titulo">${titulo}</h3>
                    <img src="${imagem}" alt="Imagem do projeto ${titulo}" class="modal-imagem">
                    <p class="modal-descricao">${descricao}</p>
                    <div class="modal-links">
                        <a href="${link}" class="botao-modal" target="_blank">VISITAR SITE</a>
                        <a href="${repo}" class="botao-modal" target="_blank">VER CÓDIGO</a>
                    </div>
                `;
                
                modal.classList.add('aberto');
            }
        });

        fecharModal.onclick = () => modal.classList.remove('aberto');
        
        window.onclick = (evento) => {
            if (evento.target == modal) {
                modal.classList.remove('aberto');
            }
        }
    }

    /**
     * Adiciona validação de formulário na página de contato.
     */
    function initValidacaoFormulario() {
        const formulario = document.getElementById('formulario-contato');
        if (!formulario) return;

        const validarEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(String(email).toLowerCase());
        };

        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault(); 
            const nome = document.getElementById('campo-nome');
            const email = document.getElementById('campo-email');
            const mensagem = document.getElementById('campo-mensagem');
            let ehValido = true;
            let mensagemErro = "";

            if (nome.value.trim() === '') {
                ehValido = false;
                nome.classList.add('erro'); 
                mensagemErro += "O campo NOME é obrigatório.\n";
            } else {
                nome.classList.remove('erro');
            }

            if (email.value.trim() === '') {
                ehValido = false;
                email.classList.add('erro');
                mensagemErro += "O campo E-MAIL é obrigatório.\n";
            } else if (!validarEmail(email.value.trim())) {
                ehValido = false;
                email.classList.add('erro');
                mensagemErro += "Por favor, insira um formato de E-MAIL válido (ex: nome@dominio.com).\n";
            } else {
                email.classList.remove('erro');
            }

            if (mensagem.value.trim() === '') {
                ehValido = false;
                mensagem.classList.add('erro');
                mensagemErro += "O campo MENSAGEM é obrigatório.\n";
            } else {
                mensagem.classList.remove('erro');
            }
            
            if (ehValido) {
                console.log("Formulário Válido! Enviando...");
                alert("Mensagem enviada com sucesso! (simulação)");
                formulario.reset();
            } else {
                alert("Por favor, corrija os seguintes erros:\n\n" + mensagemErro);
            }
        });
    }

    // Chama a função principal para iniciar o site
    init();

});