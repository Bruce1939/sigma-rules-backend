import crypto from "crypto";

const generateVerificationTokenString = () =>
    crypto.randomBytes(32).toString("hex");

export default generateVerificationTokenString;
