import getAllTasks from '../controllers/getAllTasks.js';
import deleteTask from '../controllers/deleteTask.js';
import createTask from '../controllers/createTask.js';
import updateTask from '../controllers/updateTask.js';
import express from 'express'


const router = express.Router();


// ✅ For create a task... by user sending data...
router.post('/', createTask);


// 🟩 For get all the tasks
router.get('/', getAllTasks);


// ☑️ For update a task
router.put('/:id', updateTask);


// 🟥 For delete a task
router.delete('/:id', deleteTask);


export default router;