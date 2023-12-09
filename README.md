## FitAi - Seu Personal Trainer Virtual

Na era digital, a busca por soluções inovadoras para melhorar a saúde e o condicionamento físico nunca esteve tão em alta. Com o avanço da tecnologia, é possível integrar ferramentas poderosas para criar experiências únicas e personalizadas. É nesse contexto que surge o "FitAi", seu personal trainer virtual, uma aplicação web que utiliza visão computacional para proporcionar um treinamento personalizado e eficiente.

<img src="https://github.com/rafaelomodei/fitAI/blob/master/readme/gif.gif" alt="gif FitAi">

### 📖 Introdução
O FitAi combina a praticidade da tecnologia web com a precisão da análise de movimentos por meio dos Landmarks, pontos de referência anatômicos identificados por algoritmos de visão computacional, proporcionando uma experiência única de treino.


### 🧰 Tecnologias Utilizadas
**React e TypeScript**: O [React](https://react.dev/) é uma biblioteca JavaScript popular para construir interfaces de usuário, enquanto o TypeScript adiciona tipagem estática ao JavaScript.

**Mediapipe**: Desenvolvido pelo Google, o [Mediapipe](https://developers.google.com/mediapipe) é uma biblioteca de código aberto que oferece soluções prontas para rastreamento de mãos, detecção facial e muitas outras tarefas relacionadas à visão computacional. Neste projeto, o Mediapipe será utilizado para identificar Landmarks e analisar movimentos.

<img src="https://github.com/rafaelomodei/fitAI/blob/master/readme/Pose_landmarker_model.png" alt="Pose landmarker">

### 💪 Funcionalidades Principais
**Identificação de Landmarks**: Utilizando a capacidade do Mediapipe, o FitAi identificará pontos-chave no corpo do usuário, mapeando articulações e permitindo uma análise precisa dos movimentos.

**Cálculo de Ângulos**: Com base nos Landmarks identificados, o FitAi calculará os ângulos formados pelas articulações durante os exercícios.

Ao escolher um treino específico, um conjunto de pontos-chave é carregado para o respectivo movimento, sendo essenciais para o cálculo do ângulo. Para ilustrar, num treino de biceps, os pontos-chave podem abranger as mãos, cotovelos e ombros. Na Figura abaixo os pontos selecionaos foram o 12 (ombro), 14(cotovelo) e 16(mão).

<img src="https://github.com/rafaelomodei/fitAI/blob/master/readme/pose_angle.png" alt="Pose graus">

Se desejar entender um pouco mais a funco como é feito para calcular o ângulo entre dois vetores, pode acessar [este artigo aqui](https://www.docentes.univasf.edu.br/carlos.freitas/geometria_analitica/angulo.php), escrito por Carlos Freitas.

**Seleção de Treinos**: Os usuários podem escolher diversos treinos pré-definidos, como biceps, glúteos ou costas.

**Contagem de Repetições**: A variação de ângulo em cada articulação será utilizada para determinar a conclusão de uma repetição. O FitAi realizará a contagem de repetições de forma automática.


