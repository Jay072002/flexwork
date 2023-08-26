const router = require('express').Router();
const { filterData } = require('../controller/filter');
const { verifyToken } = require('../middleware/verifyToken');

// create a dynamic filter api that works for both freelancer and client to filter the jobs and projects
// only user are allowed to access this api if they have the valid token
router.post('/', verifyToken, filterData);

module.exports = router;