# Clique para Doar R$1 (Web Super Frases) 💰🖱️✨ - Edição Rumo à Engenharia!

Bem-vindo ao **Clique para Doar R$1 (Web Super Frases)**! Mais do que um simples mini-jogo web interativo e bem-humorado, este projeto é um pequeno passo na realização de um grande sonho: **ajudar o desenvolvedor (eu!) a iniciar a faculdade de Engenharia de Software!** 🚀

Prepare-se para um desafio de cliques com uma estética **Synthwave Neon Grid** vibrante, cheio de surpresas, frases engraçadas e, quem sabe, a chance de apoiar uma futura mente da engenharia!

## 🌟 Meu Objetivo: Engenharia de Software!

Este projeto, além de ser uma forma divertida de interagir e testar suas habilidades de clique (e paciência!), nasceu de um sonho maior: o de iniciar minha jornada na faculdade de **Engenharia de Software**. Cada linha de código aqui foi escrita com entusiasmo e como um passo no meu aprendizado e na construção do meu portfólio.

A ideia do "Clique para Doar R$1" é uma maneira leve e bem-humorada de, quem sabe, arrecadar os primeiros fundos para os custos iniciais dos estudos (material, transporte, taxas, etc.). Se você se divertir com o jogo e se sentir generoso, aquele R$1 (simbolicamente pedido na brincadeira) ou qualquer forma de apoio, como feedback construtivo, compartilhamento do projeto, ou até mesmo um "boa sorte!", significaria o mundo para mim nessa caminhada.

O link de doação no jogo é real (se você configurá-lo!) e toda contribuição, por menor que seja, ajudaria diretamente a transformar esse objetivo em realidade. Mas, acima de tudo, espero que você se divirta com o jogo que criei com tanto carinho!

## 🎮 Sobre o Jogo e Suas Funcionalidades

A premissa é simples: clique na bola vermelha!
* **Acertou?** Parabéns! Você recebe uma mensagem de sucesso hilária, seu combo aumenta e você tem a chance de fazer uma doação (que agora você sabe, tem um destino especial!).
* **Errou?** Prepare-se para uma dose de sarcasmo, zoeira da bola, ou até mesmo uma mensagem desesperada do desenvolvedor. E cuidado, a bola pode crescer para "facilitar" sua vida... até dominar sua tela!

**Funcionalidades Principais:**
* **Gameplay Central:** Clique na bola vermelha para "vencer".
* **Visual Temático:** Estilo "Synthwave Neon Grid" com cores vibrantes e efeitos de brilho.
* **Mensagens Dinâmicas e Cômicas:**
    * Centenas de frases de sucesso e de falha sarcástica (`phrases.js`).
    * Frases especiais para combos épicos (`comboPhrases.js`).
    * Onomatopeias e textos para o efeito de "quase erro" (`onomatopoeia.js`).
    * Mensagens da "Bola Zombeteira" e do "Desenvolvedor Desesperado" misturadas nas falhas.
    * Mensagens de "Inflação/Deflação do Real" baseadas na sua performance.
* **Animações e Efeitos Visuais:**
    * Animação de clique na bola.
    * Animação de surgimento das mensagens de texto.
    * Animações cômicas da bola ao errar (ex: wobble, squash/stretch).
    * Efeito visual de "Quase Doloroso" com texto no local do clique.
    * Explosão de confetes para combos altos.
    * Botão de doação com efeito "sheen" (brilho deslizante).
* **Mecânicas de Jogo Engraçadas:**
    * **Combo de Acertos:** Aumente seu combo para mensagens especiais e confetes. Frases épicas a cada 50 combos!
    * **Bola Crescente:** A bola aumenta de tamanho a cada erro, podendo até "dominar" a área de jogo.
    * **Modo "Bola Maluca":** Uma chance aleatória de ativar um modo onde a bola se move erraticamente.
    * **Botão Falso de Doação Milionária:** Após 30 cliques totais, uma pegadinha!
* **Link de Doação Real (Configurável):** Um placeholder para você adicionar seu link de doação (PIX, etc.), que ajudará diretamente no objetivo da faculdade.
* **Página Dedicada para QR Code:** Uma segunda página (`qrcode.html`) para facilitar doações via QR Code PIX.

## 📂 Estrutura do Projeto

O projeto é composto pelos seguintes arquivos principais:

* `index.html`: Contém a estrutura principal da página do jogo.
* `qrcode.html`: Página dedicada para exibição do QR Code de doação.
* `style.css`: Responsável por toda a estilização visual do jogo principal.
* `style-qrcode.css`: CSS específico para a página do QR Code.
* `script.js`: O coração do jogo! Contém toda a lógica de gameplay e interações.
* `script-qrcode.js`: JavaScript para a funcionalidade de "copiar chave PIX" na página do QR Code.
* `phrases.js`: Armazena os arrays de mensagens de sucesso e de falha.
* `onomatopoeia.js`: Contém o array `almostMissEffects` para o efeito de "quase erro".
* `comboPhrases.js`: Guarda o array `specialComboMessages` para os combos épicos.

## 🚀 Como Executar o Projeto

1.  **Clone o repositório (ou baixe os arquivos):**
    ```bash
    git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
    ```
    Ou simplesmente baixe o ZIP e extraia os arquivos.

2.  **Abra o `index.html`:**
    Navegue até a pasta do projeto e abra o arquivo `index.html` diretamente no seu navegador.

Não há necessidade de build steps ou dependências complexas.

## 🛠️ Customização e Apoio

* **Link de Doação (Principal):** **MUITO IMPORTANTE!** Abra o arquivo `index.html` e substitua o placeholder `"SEU_LINK_DE_DOACAO_AQUI"` no botão de doação principal.
* **Link de Doação (Página QR Code):** Abra `qrcode.html` e:
    * Substitua `seu-qrcode-pix.png` pelo caminho da sua imagem de QR Code.
    * Substitua `SUA_CHAVE_PIX_COPIA_E_COLA_OU_ALEATORIA_AQUI` pela sua chave PIX.
* **Frases e Textos:** Sinta-se à vontade para editar `phrases.js`, `onomatopoeia.js`, e `comboPhrases.js`.
* **Estilos Visuais:** Altere `style.css` e `style-qrcode.css`.
* **Parâmetros do Jogo (`script.js`):** Ajuste constantes como `BOLA_MALUCA_CHANCE`, `TOTAL_CLICKS_FOR_FAKE_BUTTON`, etc., para balancear o jogo ao seu gosto.

## 💻 Tecnologias Utilizadas

* HTML5
* CSS3 (Animações, Variáveis CSS, Flexbox)
* JavaScript Vanilla (ES6+)

## 🤝 Contribuições e Apoio Moral

Mesmo que não possa doar, você pode ajudar de outras formas:
* **Feedback:** Se encontrar bugs ou tiver sugestões, abra uma Issue!
* **Compartilhe:** Mostre o jogo para seus amigos!
* **Estrelinha no GitHub:** Se gostou do projeto, deixe uma ⭐! Isso ajuda muito na visibilidade.
* **Pull Requests:** Se você for dev e quiser melhorar algo, PRs são bem-vindos!

Qualquer forma de apoio, mesmo que seja apenas se divertir com o jogo, já é uma grande motivação!

## 📝 Licença

Este projeto é de código aberto. Considere adicionar uma licença (como a MIT License).
*(Exemplo: Este projeto está sob a Licença MIT - veja o arquivo LICENSE.md para detalhes)*

## 👤 Autor

* **[https://github.com/LeonardoDevFS]** - Futuro Engenheiro de Software! 🎓
* Email: [leonardocarmo941@gmail.com ou leonardoperfilprofissional@gmail.com]
* LinkedIn: [https://www.linkedin.com/in/leonardo2002/]

**Muito obrigado por visitar e, potencialmente, apoiar este projeto e meu sonho!**
