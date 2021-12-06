import { Router } from "express";
import UsersControllers from "../controllers/index.js";

const routerUsers = new Router();

routerUsers.post('/register', UsersControllers.postUser);
routerUsers.post('/login', UsersControllers.authorizeUser);

export default routerUsers;