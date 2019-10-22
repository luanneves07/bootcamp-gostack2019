const express = require('express');

const server = express();

server.use(express.json());

/**
 * Middleware
 */
server.use((req, res, next) => {
    console.log(`Metodo: ${req.method}, URL: ${req.url}`);

    console.time('Request');
    next();
    console.timeEnd('Request');
});

server.listen(3000);

/**
 * Middleware de verificacao de usuario
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function checkUserExists(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: 'User name is required' });
    }

    return next();
}

function checkIndex(req, res, next) {
    const { index } = req.params;

    if (!users[index]) {
        return res.status(400).json({ error: 'User does not exsits' });
    }
    req.user = users[index];

    return next();
}
/**
 * QUERY PARAMS = ?teste=1
 * ROUTE PARAMS = /users/1
 * REQUEST BODY = { "name":"Luan", "email":"luannevessilva@gmail.com" }
 */

const users = ['Luan Neves', 'Diego', 'Claudio'];

/**
 * Query
 */
// server.get('/users', (req, res) => {
//     const nome = req.query.nome;
//     return res.json({ message: `Hello ${nome}` });
// });

/**
 * Route
 */
// server.get('/users/:id', (req, res) => {
//     const { id } = req.params;
//     return res.json({ message: `Buscando o usuario ${id}` });
// });

/**
 * Route para um user
 */
server.get('/users/:index', checkIndex, (req, res) => {
    const { index } = req.params;
    return res.json(req.user);
});

/**
 * Retorna todos os users
 */
server.get('/users', (req, res) => {
    return res.json(users);
});

/**
 * Cria um usuario (REQUEST BODY)
 */
server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
});

server.put('/users/:index', checkIndex, checkUserExists, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;
    return res.json(users);
});

server.delete('/users/:index', checkIndex, (req, res) => {
    const { index } = req.params;
    users.splice(index, 1);

    return res.send();
});