const Router = require('koa-router');
const  koaBody  = require('koa-body');
const controllerUser = require('../controllers/ControllerUser');

var router = new Router();

router.get('/', async (ctx) =>{
    ctx.body = "Servidor Rodando em http://localhost:4000";
});

router.get('/users', controllerUser.getUsers);

router.post('/users', controllerUser.createUser);

router.delete('/users/:name', controllerUser.deleteUser);

router.put('/users/:nameid', controllerUser.editaUser);

router.get('/users/:name', controllerUser.getByName);

module.exports = router;