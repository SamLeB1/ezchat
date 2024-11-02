export const signupValidationSchema = {
  email: {
    notEmpty: {
      errorMessage: "Email can't be empty.",
    },
    isEmail: {
      errorMessage: "Invalid email.",
    },
  },
  username: {
    notEmpty: {
      errorMessage: "Username can't be empty.",
    },
    isLength: {
      options: {
        max: 20,
      },
      errorMessage: "Username can't be more than 20 characters.",
    },
    isAlphanumeric: {
      errorMessage: "Username can only contain letters and numbers.",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password can't be empty.",
    },
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: "Password must be at least 8 characters.",
    },
  },
};
