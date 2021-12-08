import verifyRefreshToken from "../../../helpers/verifyRefreshToken.js"
import create from '../../../helpers/createToken.js';
import { ERROR_MESSAGES, ERROR_STATUSES } from "../../../constants.js";

const RefreshController = async (request, response, next) => {
  try{
    const { refreshToken } = request.body;
    if (!refreshToken) {
      const err = new Error(ERROR_MESSAGES.noRefresh);
      err.status = ERROR_STATUSES.badRequest;
      throw err;
    }
    const userId = await verifyRefreshToken(refreshToken);
    const token = create.token(userId);
		const refresh = create.refreshToken(userId);
		response.status(200).json({token: token, refreshToken: refresh});
  }	catch(error){
		next(new Error(error));
	}
}


export default RefreshController