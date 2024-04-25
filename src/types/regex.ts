const phoneNumberRegex = /^\d+$/;
const specialCharsRegex = /^[\w\s"'.-]+$/gm;
const userNameRegex =/^[\w]+$/gm;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^ ][\S]{8,24}$/;


export { phoneNumberRegex, specialCharsRegex, userNameRegex, passwordRegex };