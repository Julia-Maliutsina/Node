import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import routerGreetings from "./src/modules/greetings/routes/index.js";
import routerNotes from "./src/modules/notes/routes/index.js";
import routerUsers from "./src/modules/users/routes/index.js";
import passport from "passport";
import passportFindUser from "./src/passport.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routerGreetings);
app.use("/api", routerUsers);
start();
app.use(passport.initialize());
passportFindUser(passport);
app.use("/api", routerNotes);


app.use((request, response, next) => {
	const err = new Error("Not found");
	err.status = ERROR_NOT_FOUND;
	next(err);
});

app.use((err, request, response, next) => {
	response.status(err.status || ERROR_SERVER);
	response.send({
		error: {
			status: err.status || ERROR_SERVER,
			message: err.message,
		},
	});
});

async function start() {
	try {
		await mongoose.connect(process.env.DATABASE_PATH,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(PORT, () => {
			console.log(
				`Server has been started on port ${PORT} ...`
			);
		});
	} 
	catch (error) {
		console.log(error);
	}
}


