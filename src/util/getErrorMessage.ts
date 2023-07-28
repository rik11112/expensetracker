const getErrorMessage = (type: string, params?: any) => {
    switch (type) {
        case "required":
            return "This field is required";
        case "maxLength":
            return `This field cannot be longer than ${params.maxLength} characters`;
        case "minLength":
            return `This field must be at least ${params.minLength} characters`;
        default:
            return "Invalid input";
    }
}

export default getErrorMessage;