## :rocket: Sobre o desafio

Crie uma aplicação para armazenar projetos e suas tarefas do zero utilizando [Express](https://expressjs.com/pt-br/).

### Rotas

- `POST /projects`: Deve receber `id` e `title` dentro do corpo. 
Cadastrar um novo projeto dentro de um array no seguinte formato: `{ id: "1", title: 'Novo projeto', tasks: [] }`; 
**Constraints:** Enviar tanto o ID quanto o título do projeto no formato string com aspas duplas.

- `GET /projects`: Deve listar todos os projetos e tarefas;

- `PUT /projects/:id`: Altera o títutlo do projeto cujo ID corresponde ao parâmetro da URL;

- `DELETE /projects/:id`: Deleta o projeto cujo ID corresponde ao parâmetro da URL;

- `POST /projects/:id/tasks`: A rota deve receber um campo `title` e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do `id` presente nos parâmetros da rota;

### Middlewares

- Crie um middleware que será utilizado em todas rotas que recebem o ID do projeto nos parâmetros da URL que verifica se o projeto com aquele ID existe. Se não existir retorne um erro, caso contrário permita a requisição continuar normalmente;

- Crie um middleware global chamado em todas requisições que loga quantas requisições foram feitas na aplicação até então;