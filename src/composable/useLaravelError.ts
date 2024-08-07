export const handleError = <T extends string> (err: any, setFieldError?: (field: T, message: string | string[] | undefined) => void) => {
  if (!err.response) {
    if (err.message === 'Network Error') {
      return '¡Error de conexión! Por favor, inténtelo de nuevo más tarde'
    }
    else {
      return err.message
    }
  }

  if (err.response.status === 422 && err.response._data?.errors && setFieldError) {
    const errors = err.response._data.errors
    for (const key in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        const errorMessage = errors[key][0]
        setFieldError(key as T, errorMessage)
      }
    }
  }

  let message
  switch (err.response.status) {
    case 401:
      message = 'auth.errors.unauthenticated'
      break
    case 403:
      message = '¡No tienes permiso para ver esta página!'
      break
    case 422:
      message = Object.values<string>(err.response._data?.errors)?.flat()?.[0]
      break
    case 500:
      message = '¡Error interno! Por favor, inténtelo de nuevo más tarde'
      break
    default:
      message = '¡Ocurrió un error inesperado! Por favor, inténtelo de nuevo más tarde'
  }

  return message
}
