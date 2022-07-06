# Sistema de contatos integrado ao Hubspot

O desafio proposto foi desenvolver uma aplicação que esta totalmente integrada com o Hubspot, onde será possível enviar novos contatos, edita-los e visualizalos.

<h2>Tecnologias Utilizadas</h2>
Esse projeto foi desenvolvido utilizando:
<ul>
  <li>NodeJS</li>
  <li>MongoDB</li>
  <li>Hubspot</li>
  <li>VS Code</a></li>
</ul>

<h2>Back-end</h2>
Foi feito um CRUD com os seguintes métodos: GET, PUT e POST. Criando funções que, podem ser vistas no controller, e integrando com os endpoints da API do Hubspot.
Toda comunicação entre as APIs foi realizada utilizando <a href="https://axios-http.com/ptbr/docs/intro">axios</a> e a integração com o Hubspot foi toda feita como indicado na <a href="https://developers.hubspot.com/docs/api/developer-guides-resources">documentação</a> do mesmo.
<br>
<br>
As propriedades do contato foram o e-mail, o telefone e a data de aniversário. 
<br>
<br>
A validação foi toda realizada com o <a href="https://github.com/jquense/yup/tree/pre-v1">Yup</a>.

<h2>Banco de dados</h2>
Também foi utilizado o banco de dados <a href="https://www.mongodb.com/pt-br">MongoDB</a>, apenas para um acompanhamento e asseguramento de todos os dados cadastrados. Porem, todos esses dados também são totalmente visualizados no Hubspot, pelo usuário.

<h2>Inicializando a aplicação</h2>
Primeiro você deve clonar o repositório, como indicado abaixo:

```bash
git clone https://github.com/marianatheml/hubspot-integration.git
```
Usando o gerenciador de pacotes para o Node.JS <a href="https://www.npmjs.com/">npm</a> para instalar as dependencias.

```bash
npm install
```
Para rodar a aplicação localmente, deve-se criar uma arquivo .env na raiz do projeto e acrescentar os seguintes parâmetros:

```bash
DATABASE: '',
HUBSPOT_API_KEY: ''
```
E assim, execute como descrito abaixo para iniciar a aplicação:

```bash
npm start
```
