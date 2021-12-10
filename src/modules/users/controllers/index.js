import RegisterController from "./registerUser.js"
import AuthorizeController from "./authorizeUser.js"
import RefreshController from "./refreshAuthorization.js"


const UsersControllers = {
  postUser: RegisterController,
  authorizeUser: AuthorizeController,
  refresh: RefreshController
}

export default UsersControllers