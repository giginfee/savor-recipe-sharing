import crypto from "crypto";
import {sendConfirmEmail} from "./utils/emailTools";
import {htmlToText} from "html-to-text";
import {getConfirmEmailTemplate} from "./templates/confirmEmailTemplate";
import {IUser} from "./models/users";

// sendConfirmEmail({email:"giginfee@gmail.com", username: 'Gigi'},'/' )
