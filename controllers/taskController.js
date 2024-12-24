const { Task } = require('../models');

const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      userId: req.user.id
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.findAll({
      where: { userId },
      attributes: ['id', 'title', 'description', 'priority', 'dueDate', 'status', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      status: 'success',
      data: tasks,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching tasks',
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ 
      where: { 
        id,
        userId: req.user.id 
      }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.destroy({ 
      where: { 
        id,
        userId: req.user.id 
      }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};
