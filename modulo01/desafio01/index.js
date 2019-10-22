const express = require('express');
/**
 * Porta de comunicação padrão para o servidor
 */
const DEFAULT_PORT = 30001;

/**
 * Esta classe é utilizada como modelo para gerenciamento do conteúdo do array 
 * de projetos utilizado no desafio
 */
class Project {

    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.tasks = [];
    }

    addTask(description) {
        this.tasks.push(description);
    }
}
/**
 * Esta classe foi criada com o objetivo de armazenar propriedades de rota e porta
 * para o funcionamento do servidor.
 */
class DefaultServer {

    constructor(port) {
        this.initServer();
        this.port = port;
        DefaultServer.projects = [];
        DefaultServer.reqCounter = 0;
    }

    /**
     * Instancia o servidor pelo express e escuta porta definida
     * @param {Integer} port 
     */
    initServer() {
        this.server = express();
        this.initMiddlewares();
        this.initRoutes();
    }

    /**
     * Middleware para utilização do padrão JSON durante as requisições.
     */
    initMiddlewares() {
        this.server.use(express.json());
        this.server.use(this.createDebugMiddleware);
    }

    /**
     * Middleware que faz uma contagem de quantas requisições foram feitas até o momento
     */
    createDebugMiddleware(req, res, next) {
        console.log(`Number of requisitions:  ${DefaultServer.reqCounter++}`);
        return next();
    }

    /**
     * Middleware de validação de ID para as tarefas que foram criadas.
     */
    isValidProject(req, res, next) {
        const { id } = req.params;
        DefaultServer.projects.forEach(project => {
            if (task.id === id) {
                return res.status(400).json({ error: 'Task does not exsits' });
            }
        });
        return next();
    }
    /**
     * Este Middleware foi criado para evitar IDs repetidos durante as requisicoes
     */
    isIdAvailable(req, res, next) {
        const { id } = req.body;
        DefaultServer.projects.forEach(project => {
            if (project.id === id) {
                return res.status(400).json({ error: `ID ${id} already exists` });
            }
        });
        return next();
    }

    initRoutes() {
        /* Recupera todos os projetos */
        this.server.get('/projects', (req, res) => {
            return res.json(DefaultServer.projects);
        });

        /* Cria um novo projeto sem tarefas*/
        this.server.post('/projects', this.isIdAvailable, (req, res) => {
            const { id, title } = req.body;
            DefaultServer.projects.push(new Project(id, title));
            return res.send();
        });

        /* Cria uma tarefa para um projeto especifico*/
        this.server.post('/projects/:id/tasks', this.isValidProject, (req, res) => {
            const { id } = req.params;
            const { task } = req.body;
            DefaultServer.projects.forEach(project => {
                if (project.id === id) {
                    project.addTask(task);
                }
            });
            return res.send();
        });

        /* Atualiza o nome de um projeto*/
        this.server.put('/projects/:id', this.isValidProject, (req, res) => {
            const { id } = req.params;
            const { title } = req.body;
            DefaultServer.projects.forEach(project => {
                if (project.id === id) {
                    project.title = title;
                }
            });
            return res.send();
        });

        /* Deleta um projeto*/
        this.server.delete('/projects/:id', this.isValidProject, (req, res) => {
            const { id } = req.params;
            DefaultServer.projects.forEach(project => {
                if (project.id === id) {
                    const index = DefaultServer.projects.indexOf(project);
                    DefaultServer.projects.splice(index, 1);
                }
            });
            return res.send();
        });
    }

    startListening() {
        this.server.listen(this.port);
    }
}

const defaultServer = new DefaultServer(DEFAULT_PORT);
defaultServer.startListening();