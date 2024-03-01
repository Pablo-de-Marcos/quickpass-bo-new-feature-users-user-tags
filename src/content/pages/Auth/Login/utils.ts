const loginErrorHandler = (errorCode: any) => {
  switch (errorCode) {
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Usuario y/o contraseña incorrectos';
    case 'auth/too-many-requests':
      return 'Demasiados intentos, intente de nuevo en unos minutos';
    default:
      return 'Ocurrió un error inesperado';
  }
};

export { loginErrorHandler };
