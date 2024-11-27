export const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
// validate email format
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // The password must be at least 8 characters, uppercase and lowercase letters, and numbers.
export const onlyLettersRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]+$/; //This field must not have numeric characters or special characters
export const onlyNumbersRegex = /^[0-9 ]+$/; //This field should only have numeric characters.
export const onlyNumbersRegexWithoutZero = /^[1-9]+$/; //This field should only have numeric characters except 0.
export const onlyLettersAndNumbers = /^[a-zA-ZñÑ0-9]*$/; //This field allows numbers and letters but not special characters
export const onlyLettersNumbersAndSpace = /^[a-zA-ZñÑ0-9 ]*$/; //This field allows numbers and letters and space but not special characters
export const onlyLettersNumbersWithoutSpaceWithDashes = /^[a-zA-ZñÑ0-9-_]*$/; //this field allown number number , letters and - _ but no space
export const onlyNames = /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇßÿŸæÆœŒ'-\s]+$/;
