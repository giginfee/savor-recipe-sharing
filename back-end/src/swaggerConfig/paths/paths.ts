import {confirmEmailPaths} from "./authPaths/confirmEmail";
import {loginPaths} from "./authPaths/login";
import {registerPaths} from "./authPaths/register";
import {forgotPasswordPaths} from "./authPaths/forgotPassword";
import {updatePasswordPaths} from "./authPaths/updatePassword";


export const paths={
  ...registerPaths,
  ...loginPaths,
  ...confirmEmailPaths,
  ...forgotPasswordPaths,
  ...updatePasswordPaths,

}
