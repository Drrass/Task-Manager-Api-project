const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// Protect all task routes
router.use(authenticateToken);

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
