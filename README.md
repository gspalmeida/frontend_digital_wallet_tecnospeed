# FrontEnd Carteira Digital com Categorias e Gestão de Usuários

##### Descrição
Projeto criado para a avaliação de conhecimento técnico da TecnoSpeed para a vaga de Node.js (mas também ligada a front). 

**Deploy do FrontEnd feito no Netlify, e disponível no link abaixo:**

**Link:** [Acessar o Front Online](https://frontend-digital-wallet.netlify.app/)

Credênciais de acesso:

**Admin:**
Email: admin@email.com
Senha: senha123

**Usuário:**
Email: user@email.com
Senha: senha123

------------
## Instalação

Dentro da pasta do projeto (após clonar o repositório) executar:
###### `yarn install` Para Instalar as dependencias

###### `yarn start` Para levantar o FrontEnd Localmente

**OBS: Na primeira vez que o servidor é iniciado ele abre na Home ao invés da tela de login. Esse não é o comportamento correto da aplicação, mas não deu tempo para corrigir esse bug... Basta clicar em "Sair" e daí pra frente a aplicação segue sem problemas.**

-----------

### Funcionalidades:
 - **Cadastro de Usuários** com upload de Avatar; 
 - **Moderação de Usuários** pelo Administrador (Cadastro de Administrador apenas pela API); [Ver Tela](https://github.com/gspalmeida/frontend_digital_wallet_tecnospeed/blob/main/screenshots/HomeAdmin.png?raw=true)
 - Login de Usuários e Administradores pela mesma tela;
 - **Criação de Categorias** para as movimentações financeiras da carteira; [Ver Tela](https://github.com/gspalmeida/frontend_digital_wallet_tecnospeed/blob/main/screenshots/Cria%C3%A7%C3%A3oDeCategorias.png?raw=true)
 - Modal para **Edição de Categorias**;[Ver Tela](https://github.com/gspalmeida/frontend_digital_wallet_tecnospeed/blob/main/screenshots/ModalEdi%C3%A7%C3%A3oCategorias.png?raw=true)
 - **Criação de Movimentações Financeiras** da Carteira;  [Ver Tela](https://github.com/gspalmeida/frontend_digital_wallet_tecnospeed/blob/main/screenshots/Cria%C3%A7%C3%A3oDeMovimenta%C3%A7%C3%B5esFinanceiras.png?raw=true)
 - Criação Rápida de Categorias através da tela de Movimentações Financeiras (**Input com pesquisa e criação de novas categorias**); [Ver Tela](https://github.com/gspalmeida/frontend_digital_wallet_tecnospeed/blob/main/screenshots/Adi%C3%A7%C3%A3oRapida%20de%20Categorias.png?raw=true)
 - Exibição do **Saldo da Carteira**;
 - **Filtro por data** das Movimentações Financeiras;
 - **Exportação dos dados para CSV**: A respeito dessa funcionalidade fiz ela por ultimo e correndo pois o prazo estava acabando, fiquei bem insatisfeito como como está essa parte do código :/
