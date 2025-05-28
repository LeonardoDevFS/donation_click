# Clique para Doar R$1 (Web Super Frases) 💰🖱️✨

Bem-vindo ao **Clique para Doar R$1 (Web Super Frases)**! Um mini-jogo web interativo e bem-humorado onde sua mira e persistência podem (de brincadeirinha) te dar o "direito" de fazer uma doação de R$1. O objetivo principal é se divertir com as frases engraçadas, os efeitos visuais e as mecânicas malucas.

Prepare-se para um desafio de cliques com uma estética **Synthwave Neon Grid** vibrante e cheio de surpresas!

## 🎮 Sobre o Jogo

A premissa é simples: clique na bola vermelha!
* **Acertou?** Parabéns! Você recebe uma mensagem de sucesso hilária, seu combo aumenta e você tem a chance de fazer uma doação (de verdade, se quiser!).
* **Errou?** Prepare-se para uma dose de sarcasmo, zoeira da bola, ou até mesmo uma mensagem desesperada do desenvolvedor. E cuidado, a bola pode crescer para "facilitar" sua vida... até dominar sua tela!

O jogo é uma brincadeira, mas o link de doação pode ser real se você configurá-lo. A diversão é garantida com as dezenas de frases e efeitos!

## ✨ Funcionalidades Principais

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
    * **Bola Crescente:** A bola aumenta de tamanho a cada erro, tornando-se progressivamente mais fácil (e cômica), podendo até "dominar" a área de jogo.
    * **Modo "Bola Maluca":** Uma chance aleatória de ativar um modo onde a bola se move erraticamente, muda de cor e tamanho, oferecendo um bônus de combo se acertada.
    * **Botão Falso de Doação Milionária:** Após 30 cliques totais, um botão super chamativo de "Doar R$10.000" aparece para uma pegadinha.
* **Link de Doação Real (Configurável):** Um placeholder para você adicionar seu link de doação verdadeiro.

## 📂 Estrutura do Projeto

O projeto é composto pelos seguintes arquivos principais:

* `index.html`: Contém a estrutura principal da página do jogo.
* `style.css`: Responsável por toda a estilização visual, tema Synthwave e animações CSS.
* `script.js`: O coração do jogo! Contém toda a lógica de gameplay, manipulação de eventos, animações dinâmicas e atualização dos elementos da página.
* `phrases.js`: Armazena os arrays de mensagens de sucesso (`successMessages`) e de falha sarcástica (`failMessagesSarcastic`).
* `onomatopoeia.js`: Contém o array `almostMissEffects` com textos e classes para o efeito visual de "quase erro".
* `comboPhrases.js`: Guarda o array `specialComboMessages` para as mensagens exibidas em marcos de combo épicos (múltiplos de 50).

## 🚀 Como Executar o Projeto

Este projeto é puramente front-end, utilizando HTML, CSS e JavaScript vanilla. Não há necessidade de build steps ou dependências complexas.

1.  **Clone o repositório (ou baixe os arquivos):**
    ```bash
    git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
    ```
    Ou simplesmente baixe o ZIP e extraia os arquivos.

2.  **Abra o `index.html`:**
    Navegue até a pasta do projeto e abra o arquivo `index.html` diretamente no seu navegador de preferência (Google Chrome, Firefox, Edge, etc.).

E pronto! O jogo deve carregar e você já pode começar a clicar (e rir)!

## 🛠️ Customização

Você pode facilmente customizar diversos aspectos do jogo:

* **Link de Doação:** **MUITO IMPORTANTE!** Abra o arquivo `index.html` e substitua o placeholder `"SEU_LINK_DE_DOACAO_AQUI"` no botão de doação pelo seu link real (PIX, PicPay, Ko-fi, etc.).
    ```html
    <a href="SEU_LINK_DE_DOACAO_AQUI" target="_blank" id="donateButton">Quero Doar R$1 Agora!</a>
    ```

* **Frases e Textos:**
    * **Sucesso e Falha:** Edite os arrays em `phrases.js` para adicionar, remover ou modificar as mensagens.
    * **"Quase Erro":** Modifique ou adicione efeitos no array `almostMissEffects` em `onomatopoeia.js`. Lembre-se de criar as classes CSS correspondentes em `style.css` se adicionar novos tipos de animação.
    * **Combos Épicos:** Adicione suas próprias frases triunfantes ao array `specialComboMessages` em `comboPhrases.js`.

* **Estilos Visuais:**
    * Altere cores, fontes, animações e o tema geral editando o arquivo `style.css`.

* **Parâmetros do Jogo (`script.js`):**
    Diversas constantes e variáveis no início do `script.js` podem ser ajustadas para mudar o comportamento do jogo:
    * `STREAK_THRESHOLD_FOR_SPECIAL_MESSAGE`: Combo mínimo para uma menção especial.
    * `HIGH_COMBO_FOR_CONFETTI`: Combo para disparar confetes.
    * `EPIC_COMBO_MILESTONE`: Múltiplos deste valor para frases épicas (atualmente 50).
    * `INITIAL_BALL_SIZE`: Tamanho inicial da bola.
    * `BALL_GROWTH_FACTOR`: Quão rápido a bola cresce ao errar.
    * `TOTAL_CLICKS_FOR_FAKE_BUTTON`: Número de cliques para o botão falso aparecer (atualmente 30).
    * `BOLA_MALUCA_CHANCE`: Probabilidade do modo "Bola Maluca" ser ativado (atualmente 0.03 ou 3%).
    * E outras durações de `setTimeout` ou `setInterval` para controlar a velocidade das animações e modos.

## 💻 Tecnologias Utilizadas

* **HTML5**
* **CSS3** (com Animações, Variáveis CSS, Flexbox)
* **JavaScript Vanilla** (ES6+)

## 🤝 Contribuições

Este é um projeto feito para diversão! Se você tiver ideias para novas frases cômicas, mecânicas malucas, melhorias visuais ou correções de bugs, sinta-se à vontade para:

1.  Abrir uma **Issue** para discutir sua ideia.
2.  Fazer um **Fork** do projeto, implementar sua melhoria e abrir um **Pull Request**.

Toda contribuição criativa é bem-vinda!

## 📝 Licença

Este projeto é de código aberto. Considere adicionar uma licença (como a MIT License) se desejar que outros o utilizem e modifiquem livremente.
(Exemplo: Este projeto está sob a Licença MIT - veja o arquivo LICENSE.md para detalhes)

## 👤 Autor

* **[SEU NOME / SEU USERNAME DO GITHUB AQUI]**
* Sinta-se à vontade para adicionar seus links de contato ou redes sociais!

---

Espero que este README detalhado ajude a apresentar seu projeto de forma incrível! Lembre-se de substituir os placeholders como `[SEU_USUARIO/SEU_REPOSITORIO]`, `[SEU NOME ...]`, e o link do screenshot/GIF.
