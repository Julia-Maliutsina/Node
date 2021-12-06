import RegisterController from "./registerUser.js"
import AuthorizeController from "./authorizeUser.js"


const UsersControllers = {
  postUser: RegisterController,
  authorizeUser: AuthorizeController,
}

export default UsersControllers