const {Router} = require('express')
const dogsMain = require('./Dogs.js');
const temperaments = require('./Temperaments.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.use('/dogs',dogsMain);
router.use('/temperaments',temperaments)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
