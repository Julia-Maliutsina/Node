import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
  password: {
		type: String,
		required: true,
	}
});

const Users = mongoose.model("users", UserSchema);

export default Users