<h1>Projeto DevOz: </h1>

<p>O objetivo do projeto é, usando o NodeJs, Koa, Mocha e Chai, fazer uma API que permita:</p>
<p>Adicionar, editar, lista e remover usuários. </p>
<p>Como bônus, a lista de usuário pode permitir paginação. (Não é necessário, é bônus)</p>
<p>O projeto base já possui boa parte da implementação pronta, incluindo alguns testes de unidade.</p>
<p>Não é necessário conexão com nenhuma base de dados, tudo pode rodar em memória.</p>
<p>Como bônus, pode ser adicionado suporte ao banco de dados sqlite. (Não é necessário, é bônus)</p>

<h2>Requisitos para rodar o Projeto:</h2>

<p> Antes de rodar o projeto em sua maquina, é importante que você tenha instalado na sua maquina as ferramentas: Node.js e MongoDB</p>

<h1>PASSOS PARA RODAR O PROJETO:</h1>

<h2>Back-End:</h2>


<h5># Faça o clone deste repositorio ou baixe o zip</h5>
<p>git clone https://github.com/BrenoJoseCoelho/ProjetoDevOz.git </p>

<h5># Acesse a pasta server</h5>
<p>cd server</p>

<h5># Instale as dependencias<h5>
<p>npm install</p>

<h5># Para rodar os testes de unidade</h5>
<p>npm test</p>

<h5># Para rodar a API</h5>
<p>npm run dev<p>

<hr>

<h2>Front-end:</h2>
<h5>** A API(back-end) deve estar rodando **</h5>

<h5> # Acesse a pasta interface </h5>
<p>cd interface</p>

<h5># Instale as dependencias</h5>
<p>npm install</p>

<h5># Rode a aplicação</h5>
<p>npm run serve</p>