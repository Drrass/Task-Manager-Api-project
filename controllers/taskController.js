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
    const { priority, status, sortBy } = req.query;
    let query = { where: { userId: req.user.id } };
    
    // I will  Add filters if provided
    if (priority) query.where.priority = priority;
    if (status) query.where.status = status;
    
    // I will Add sorting if provided
    if (sortBy) {
      query.order = [[sortBy, 'ASC']];
    }

    const tasks = await Task.findAll(query);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
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
