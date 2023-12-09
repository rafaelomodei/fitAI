## FitAi - Seu Personal Trainer Virtual

Na era digital, a busca por soluções inovadoras para melhorar a saúde e o condicionamento físico nunca esteve tão em alta. Com o avanço da tecnologia, é possível integrar ferramentas poderosas para criar experiências únicas e personalizadas. É nesse contexto que surge o "FitAi", seu personal trainer virtual, uma aplicação web que utiliza visão computacional para proporcionar um treinamento personalizado e eficiente.

<img src="https://github.com/rafaelomodei/fitAI/blob/master/readme/gif.gif" alt="Texto Alternativo">

### 📖 Introdução
O FitAi combina a praticidade da tecnologia web com a precisão da análise de movimentos por meio dos Landmarks, pontos de referência anatômicos identificados por algoritmos de visão computacional, proporcionando uma experiência única de treino.


### ⚙ Tecnologias Utilizadas
**React e TypeScript**: O [React](https://react.dev/) é uma biblioteca JavaScript popular para construir interfaces de usuário, enquanto o TypeScript adiciona tipagem estática ao JavaScript, tornando o código mais .

**Mediapipe**: Desenvolvido pelo Google, o [Mediapipe](https://developers.google.com/mediapipe) é uma biblioteca de código aberto que oferece soluções prontas para rastreamento de mãos, detecção facial e muitas outras tarefas relacionadas à visão computacional. Neste projeto, o Mediapipe será utilizado para identificar Landmarks e analisar movimentos.


### 💪 Funcionalidades Principais
**Identificação de Landmarks**: Utilizando a capacidade do Mediapipe, o FitAi identificará pontos-chave no corpo do usuário, mapeando articulações e permitindo uma análise precisa dos movimentos.

**Cálculo de Ângulos**: Com base nos Landmarks identificados, o FitAi calculará os ângulos formados pelas articulações durante os exercícios, proporcionando uma avaliação detalhada da postura do usuário.

**Seleção de Treinos**: Os usuários poderão escolher entre uma variedade de treinos pré-definidos, como flexões, agachamentos, ou até mesmo criar seus próprios treinos personalizados.

**Contagem de Repetições**: A variação de ângulo em cada articulação será utilizada para determinar a conclusão de uma repetição. O FitAi realizará a contagem de repetições de forma automática e precisa.
