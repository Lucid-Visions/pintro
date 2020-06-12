/**
   * Validates input on a field.
   *
   * @param options Information for the field to be validated.
   * @param options.regex The Regex to be used for validation.
   * @param options.input Input from the field to be validated.
   * @return Boolean result of validation.
 */

const fieldValidator = (options = {}) => {
    if (options.regex.test(options.input) === false) {
        return false;
    } else {
        return true;
    }
}

export default fieldValidator;