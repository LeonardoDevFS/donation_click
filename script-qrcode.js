// script-qrcode.js
document.addEventListener('DOMContentLoaded', () => {
    const pixKeyInput = document.getElementById('pixKeyInput');
    const copyPixKeyButton = document.getElementById('copyPixKeyButton');
    const copyFeedback = document.getElementById('copyFeedback');

    if (copyPixKeyButton && pixKeyInput) {
        copyPixKeyButton.addEventListener('click', () => {
            pixKeyInput.select(); // Seleciona o texto no input
            pixKeyInput.setSelectionRange(0, 99999); // Para dispositivos móveis

            try {
                // Tenta usar a API Clipboard (moderna e segura)
                navigator.clipboard.writeText(pixKeyInput.value)
                    .then(() => {
                        if (copyFeedback) {
                            copyFeedback.textContent = "Chave PIX copiada! O Dev agradece sua humildade, kk. ";
                            copyFeedback.style.display = 'block';
                            setTimeout(() => {
                                copyFeedback.style.display = 'none';
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        // Fallback para execCommand se a API Clipboard falhar ou não for suportada
                        console.warn('Falha ao copiar com navigator.clipboard, tentando execCommand:', err);
                        executeCopyFallback();
                    });
            } catch (e) {
                 // Fallback para navegadores muito antigos que não suportam navigator.clipboard
                console.warn('Navigator.clipboard não suportado, tentando execCommand:', e);
                executeCopyFallback();
            }
        });
    }

    function executeCopyFallback() {
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                if (copyFeedback) {
                    copyFeedback.textContent = "Chave PIX copiada! (fallback)";
                    copyFeedback.style.display = 'block';
                    setTimeout(() => {
                        copyFeedback.style.display = 'none';
                    }, 2000);
                }
            } else {
                 if (copyFeedback) {
                    copyFeedback.textContent = "Falha ao copiar. Tente manualmente.";
                    copyFeedback.style.color = "#FF3D71"; // Cor de erro
                    copyFeedback.style.display = 'block';
                     setTimeout(() => {
                        copyFeedback.style.display = 'none';
                        copyFeedback.style.color = "#50fa7b"; // Volta para cor de sucesso
                    }, 3000);
                }
                console.error('Fallback execCommand: Não foi possível copiar');
            }
        } catch (err) {
            if (copyFeedback) {
                copyFeedback.textContent = "Falha ao copiar. Tente manualmente.";
                copyFeedback.style.color = "#FF3D71";
                copyFeedback.style.display = 'block';
                 setTimeout(() => {
                    copyFeedback.style.display = 'none';
                    copyFeedback.style.color = "#50fa7b";
                }, 3000);
            }
            console.error('Fallback execCommand: Erro ao copiar', err);
        }
        // Remove a seleção do input após a tentativa de cópia
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else if (document.selection) {
            document.selection.empty();
        }
    }
});