import express from "express";
import mongoose from "mongoose";
import routerGreetings from "./src/modules/greetings/routes/index.js";
import routerNotes from "./src/modules/notes/routes/index.js";
import routerUsers from "./src/modules/users/routes/index.js";

const app = express();
const PORT = process.env.PORT ?? 3000;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routerGreetings);
app.use("/api", routerNotes);
app.use("/api", routerUsers);

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
		await mongoose.connect( "mongodb+srv://julia_maliutsina:q1w2e3r4@cluster0.ccww9.mongodb.net/my-notes-app",
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

start();
