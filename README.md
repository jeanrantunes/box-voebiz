# Configuração #

1. Instalar nodejs: https://nodejs.org/en/
2. Instalar gulp global: npm install -g gulp-cli

# Usar #
1. Copiar o conteúdo da pasta para a pasta do projeto em questão.
2. Abrir o CMD como administrador e dar cd até a raiz da pasta framework
3. npm start

Após utilizar a primeira vez, para rodar novamente o build, utilize o comando gulp.

Obs: A primeira instalação é demorada.

# Otimizar para Deploy #
1. Utilizar o comando: gulp build

# Possíveis problemas #

O Windows não adicionar o npm a variável PATH na hora da instalação do NodeJs.
   - Instalar novamente, reiniciar a maquina, verificar a variável de ambiente, caso não contenha o caminho do npm, adicionar.


# Principais funções #

- Integração handlesbar, podemos criar páginas, partials e componentes reutilizáveis em todo projeto, cada um destes pode ter um json de dados atribuído para si, sendo possível reaproveitamento da estrutura HTML, trocando apenas os dados.
- Stylus css preprocessor, utilizando nib para automações crossbrowser.
- Sprites para assets, como ícones por exemplo.
- Jshint, stylus lint.
- Imagemin para imagens.
- BrowserSync para rodar o projeto, monta um server e faz sync dos navegadores em diferentes dispositivos, para melhor debug durante dev com responsividade.
- Minifica css e js para deploy.
- Integração com Bower