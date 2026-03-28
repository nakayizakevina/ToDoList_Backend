import {Router} from "express";

import {editTask, deleteTask,displaySingleTask, displayAllTask, createTask} from "../controllers/task.controller.js";

const router = Router();

router.route('/createtask').post(createTask);
router.route('/getalltasks').get(displayAllTask);
router.route('/getsingletask/:id').get(displaySingleTask);
router.route('/deletetask/:id').delete(deleteTask);
router.route('/edittask/:id').patch(editTask);

export default router;

