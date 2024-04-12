export const PASSWORD_REGEX = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR = 
    "lower_case, UPPER_CASE, a number and Special Characters!";

export const PASSWORD_MIN_LENGTH = 4;
