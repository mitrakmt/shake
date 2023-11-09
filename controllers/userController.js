import {
  getUserFromId
} from '../services/userService.js';
  
const getUserInfo = async (req, res, next) => {
    const userId = req.authData.userId
    try {
        const user = await getUserFromId(userId)
        const responseUser = {
            id : user._id,
            email : user.email,
        } 
        res.json({user : responseUser});
    } catch (error) {
        next(error);
    }
};

const updateUserInfo = async (req, res, next) => {
    const userId = req.authData.userId
    try {
        const user = await getUserFromId(userId)
        const responseUser = {
            id : user._id,
            email : user.email,
        } 

        //TODO: update user in responseUser
        
        res.json({
            user: responseUser
        });
    } catch (error) {
        next(error);
    }
}
 
export default { 
    getUserInfo,
    updateUserInfo
}