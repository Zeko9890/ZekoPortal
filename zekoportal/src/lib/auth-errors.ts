export function getAuthErrorMessage(error: any): string {
  if (!error) return "Something went wrong. Please try again.";
  
  const code = error.code || "";
  const message = error.message || "";
  
  // Extract Firebase error code if provided in format: Firebase: Error (auth/invalid-credential).
  let errorCode = code;
  if (!errorCode && typeof message === 'string') {
      const match = message.match(/\(auth\/([a-z-]+)\)/);
      if (match) errorCode = "auth/" + match[1];
  }

  switch (errorCode) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Incorrect email or password.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    default:
      return "Something went wrong. Please try again.";
  }
}
