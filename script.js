// ==================== CONFIGURAÇÕES DE TRADUÇÃO ====================
const translations = {
    en: {
        pirateInfo: `
            <h3>Pirates</h3>
            <p>Pirates were fearless warriors who attacked ships for gold and adventure! Romanticized in fiction but often cruel in history.</p>
            
            <h3>Pirate Names</h3>
            <p>Every legendary pirate had a striking nickname. Blackbeard was more famous than his real name (Edward Teach).</p>
            
            <h3>How to use</h3>
            <p>Type a name and click generate. Leave blank for a random name.</p>
            
            <h3>Tip</h3>
            <p>Try our <a href="#" id="quizBtn">quiz</a> for a personalized name!</p>
        `,
        formSuccess: 'Message sent successfully!',
        formError: 'Error sending. Please try again.'
    },
    pt: {
        pirateInfo: `
            <h3>Piratas</h3>
            <p>Os piratas são guerreiros destemidos que atacam navios em busca de ouro e aventura! Na ficção são carismáticos, mas na história foram cruéis.</p>
            
            <h3>Nomes de Piratas</h3>
            <p>Todo pirata lendário tinha um apelido marcante. Barba Negra, por exemplo, era mais famoso que seu nome real (Edward Teach).</p>
            
            <h3>Como usar</h3>
            <p>Digite um nome e clique em gerar. Se quiser um nome aleatório, deixe o campo em branco.</p>
            
            <h3>Dica</h3>
            <p>Experimente nosso <a href="#" id="quizBtn">quiz</a> para um nome personalizado!</p>
        `,
        formSuccess: 'Mensagem enviada com sucesso!',
        formError: 'Erro ao enviar. Por favor, tente novamente.'
    }
};

// ==================== FUNÇÕES DE ACESSIBILIDADE ====================

// Configurações do VLibras com tratamento de erro
function initVLibras() {
    try {
        if (typeof VLibras !== 'undefined') {
            new VLibras.Widget({
                rootPath: '/app',
                personalization: {
                    color: '#8b4513',
                    avatar: 'pirate'
                }
            });
            console.log('VLibras inicializado com sucesso');
        } else {
            console.error('VLibras não está disponível');
        }
    } catch (error) {
        console.error('Erro ao inicializar VLibras:', error);
    }
}

// Leitor de Tela aprimorado
function readAloud(text = null) {
    try {
        if ('speechSynthesis' in window) {
            const content = text || `Gerador de Nomes Piratas. Nome atual: ${document.getElementById('shipName')?.textContent || 'não disponível'}. 
                                  Você pode gerar um novo nome, baixar ou compartilhar.`;
            
            window.speechSynthesis.cancel();
            
            const speech = new SpeechSynthesisUtterance(content);
            speech.lang = 'pt-BR';
            speech.rate = 0.9;
            
            const voices = window.speechSynthesis.getVoices();
            const portugueseVoice = voices.find(voice => 
                voice.lang.includes('pt') || voice.lang.includes('PT'));
            
            if (portugueseVoice) {
                speech.voice = portugueseVoice;
            }
            
            window.speechSynthesis.speak(speech);
        } else {
            alert('Seu navegador não suporta leitura em voz alta. Tente o Chrome ou Edge.');
        }
    } catch (error) {
        console.error('Erro no leitor de voz:', error);
    }
}

// ==================== FUNÇÕES DE IDIOMA ====================

function updateLanguage(lang = 'pt') {
    const infoContainer = document.getElementById('infoContainer');
    if (!infoContainer) return;
    
    infoContainer.style.opacity = 0;
    
    setTimeout(() => {
        infoContainer.innerHTML = translations[lang]?.pirateInfo || translations.pt.pirateInfo;
        infoContainer.style.opacity = 1;
        
        // Reatribui eventos a elementos dinâmicos
        document.getElementById('quizBtn')?.addEventListener('click', handleQuiz);
    }, 300);
}

function handleQuiz(e) {
    e.preventDefault();
    // Implementação do quiz aqui
    console.log('Quiz iniciado');
    readAloud('Iniciando quiz de nomes piratas!');
}

// ==================== MANIPULAÇÃO DE FORMULÁRIO ====================

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    const statusElement = document.getElementById('formStatus') || createStatusElement(form);
    
    try {
        // Feedback visual durante o envio
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        submitButton.style.opacity = '0.7';
        submitButton.classList.add('sending');
        
        const response = await fetch('https://formsubmit.co/ajax/contato@nomespiratas.com.br', {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                message: document.getElementById('message')?.value || '',
                _subject: 'Novo contato do site Nomes Piratas'
            })
        });

        if (!response.ok) throw new Error('Erro no servidor');

        const data = await response.json();
        
        if (data.success) {
            window.location.href = 'obrigado.html';
        } else {
            throw new Error('Erro no envio');
        }
        
    } catch (error) {
        console.error('Erro no envio do formulário:', error);
        
        statusElement.textContent = translations[document.documentElement.lang]?.formError || translations.pt.formError;
        statusElement.className = 'form-status error';
        statusElement.style.display = 'block';
        statusElement.scrollIntoView({ behavior: 'smooth' });
        
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        submitButton.style.opacity = '1';
        submitButton.classList.remove('sending');
    }
}

function createStatusElement(form) {
    const div = document.createElement('div');
    div.id = 'formStatus';
    form.appendChild(div);
    return div;
}

// ==================== INICIALIZAÇÃO ====================

document.addEventListener('DOMContentLoaded', function() {
    // Carregamento do VLibras (com fallback)
    if (typeof VLibras === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
        script.onload = initVLibras;
        document.body.appendChild(script);
    } else {
        initVLibras();
    }

    // Configuração do leitor de voz
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = function() {
            console.log('Vozes carregadas:', window.speechSynthesis.getVoices());
        };
        
        // Força o carregamento se necessário
        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.getVoices();
        }
    }
    
    // Atalhos de acessibilidade
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === '1') initVLibras();
        if (e.altKey && e.key === '2') readAloud();
    });

    // Configuração do formulário
    document.getElementById('contactForm')?.addEventListener('submit', handleFormSubmit);
    
    // Inicializa o idioma
    updateLanguage(document.documentElement.lang || 'pt');
    
    // Configura o botão de quiz
    document.getElementById('quizBtn')?.addEventListener('click', handleQuiz);
});
// Carregar html2canvas dinamicamente se não estiver disponível
async function loadHtml2Canvas() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

// Função principal de download
async function downloadName() {
    try {
        // Verificar se html2canvas está disponível
        if (typeof html2canvas === 'undefined') {
            // Mostrar feedback para o usuário
            downloadBtn.disabled = true;
            downloadBtn.querySelector('.button-text').textContent = translations[currentLanguage].download + '...';
            
            // Carregar a biblioteca dinamicamente
            await loadHtml2Canvas();
            
            // Pequeno delay para garantir o carregamento
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Configurações do html2canvas
        const canvas = await html2canvas(document.querySelector(".container"), {
            scale: 2,                     // Melhor qualidade (2x)
            logging: false,               // Desativa logs no console
            useCORS: true,                // Permite imagens cross-origin
            backgroundColor: null,        // Fundo transparente
            allowTaint: true,             // Permite conteúdo misto
            scrollX: 0,                   // Ajuste de posição
            scrollY: -window.scrollY      // Corrige posição com scroll
        });
        
        // Criar link de download
        const link = document.createElement('a');
        link.download = `${translations[currentLanguage].title} - ${currentName.replace(/"/g, '')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // Feedback visual de sucesso
        showFormStatus(translations[currentLanguage].download + ' concluído!', 'success');
        
    } catch (error) {
        console.error("Erro ao baixar:", error);
        showFormStatus(translations[currentLanguage].formError, 'error');
        
    } finally {
        // Restaurar estado do botão independente de sucesso ou falha
        if (downloadBtn) {
            downloadBtn.disabled = false;
            downloadBtn.querySelector('.button-text').textContent = translations[currentLanguage].download;
        }
    }
}

// Função auxiliar para mostrar status
function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    // Esconder após 5 segundos
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}
downloadBtn.addEventListener("click", downloadName);
