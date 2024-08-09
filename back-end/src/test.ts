import crypto from "crypto";
import {sendConfirmEmail} from "./utils/emailTools";
import {htmlToText} from "html-to-text";
import {getConfirmEmailTemplate} from "./templates/confirmEmailTemplate";

// sendConfirmEmail({email:"giginfee@gmail.com", username: 'Gigi'},'/' )
