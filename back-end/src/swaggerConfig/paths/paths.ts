import {confirmEmailPaths} from "./authPaths/confirmEmail";
import {loginPaths} from "./authPaths/login";
import {registerPaths} from "./authPaths/register";
import {forgotPasswordPaths} from "./authPaths/forgotPassword";
import {updatePasswordPaths} from "./authPaths/updatePassword";
import {allUsers} from "./userPaths/getAllUsers";
import {updateUser} from "./userPaths/updateUser";
import {deleteUser} from "./userPaths/deleteUser";
import {userById} from "./userPaths/getUserById";
import {deleteUserById} from "./userPaths/deleteUserById";
import {currentUserPaths} from "./userPaths/getCurrentUser";
import {uploadPhotoPaths} from "./userPaths/uploadPhoto";


export const paths={
  ...registerPaths,
  ...loginPaths,
  ...confirmEmailPaths,
  ...forgotPasswordPaths,
  ...updatePasswordPaths,
  ...currentUserPaths,
  '/api/v1/users':{
    ...allUsers,
    ...updateUser,
    ...deleteUser,
  },
  '/api/v1/users/{id}':{
    ...userById,
    ...deleteUserById,
  },
  ...uploadPhotoPaths,


}
