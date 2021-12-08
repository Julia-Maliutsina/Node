import verifyRefreshToken from "../../../helpers/verifyRefreshToken.js"
import create from '../../../helpers/createToken.js';

const ERROR_STATUS = 400;
const ERROR_NO_REFRESH = "Refresh token not provided";

const RefreshController = async (request, response, next) => {
  try{
    const { refreshToken } = request.body;
    if (!refreshToken) {
      const err = new Error(ERROR_NO_REFRESH);
      err.status = ERROR_STATUS;
      throw err;
    }
    const userId = await verifyRefreshToken(refreshToken);
    const token = create.token(userId);
		const refresh = create.refreshToken(userId);
		response.status(200).json({token: token, refreshToken: refresh});
  }
	catch(error){
		next(new Error(error));
	}
}


export default RefreshController