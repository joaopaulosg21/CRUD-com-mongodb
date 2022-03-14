import { Router } from "express";
import { newUser,viewUsers,updateUser,deleteUser } from "../controller/UserController.js";
const router = Router();

router.post('/add',newUser);

router.get('/',viewUsers);

router.put('/update/:id',updateUser);

router.delete('/delete/:id',deleteUser);

export default router;