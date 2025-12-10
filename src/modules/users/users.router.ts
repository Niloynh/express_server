import  express from 'express';
import { userController } from './users.controller';
import auth from '../../middleware/auth';
import logger from '../../middleware/logger';


const router = express.Router();

router.post("/", userController.createUsers);
router.post("/todos", userController.createTodo)

router.get("/", logger, auth("admin"), userController.getUser)
router.get("/todos", userController.getTodo); 

router.get("/:id", auth("admin", "user"), userController.getSingleUser)
router.get("/todos/:id", userController.getTodoById)




router.put("/:id", userController.updateUser)
router.put("/todos/:id", userController.updateTodo)
router.put("todos/:id", userController.updateTodoById)

router.delete("/:id", userController.deleteUser)
router.delete("/todos/:id", userController.deleteTodo)




export const userRouter = router;