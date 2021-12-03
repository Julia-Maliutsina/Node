import { Router } from "express";
import GreetingsControllers from "../controllers/index.js";

const routerGreetings = new Router();

routerGreetings.get('/greetings', GreetingsControllers.getName);

export default routerGreetings