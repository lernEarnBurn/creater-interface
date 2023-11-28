interface ValidationMessages {
  usernameMessage?: string;
  passwordMessage?: string;
}

export function signUpValidation(
  username: string | undefined,
  password: string | undefined,
): ValidationMessages {
  const validationMessages = { usernameMessage: "", passwordMessage: "" };

  //the if statements are written strangely because ts is annoying
  if (username !== undefined) {
    if (username.length < 3) {
      validationMessages.usernameMessage =
        "Username must be at least 3 characters long.";
    }
  } else {
    validationMessages.usernameMessage =
      "Username must be at least 3 characters long.";
  }

  if (password !== undefined) {
    if (password.length < 6) {
      validationMessages.passwordMessage =
        "Password must be at least 6 characters long.";
    }
  } else {
    validationMessages.passwordMessage =
      "Password must be at least 6 characters long.";
  }

  return validationMessages;
}
