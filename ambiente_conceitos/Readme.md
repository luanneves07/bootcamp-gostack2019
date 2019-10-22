## Sobre o projeto

- Este projeto foi utilizado para acompanhar o andamento do módulo 01 referente ao bootCamp 2019.
- Escuta requisições na porta 3000;

### Rotas

- `GET /users`: Deve listar todos os usuários;

- `GET /users/:index`: Deve listar apenas um usuário;

- `POST /users`: Insere um novo usuário em um array que deve ser armazenado para possíveis consultas;
**Constraints:** Após inserir novo usuário, uma lista contendo todos cadastrados até o momento deve ser exibida;

- `PUT /users/:index`: Atualiza um usuário de acordo com o index recebido como parâmetro de URL;

- `DELETE /users/:index`: Deleta o usuário cujo ID corresponde ao parâmetro da URL;

### Middlewares

- Criar um middleware que verifica se existe um usuário atribuído ao ID;

- Criar um middleware que verifica se o nome do usuário foi preenchido;