import { useNotyf } from '/@src/composable/useNotyf'
import { useFetch } from '/@src/composable/useFetch'
import { formatError } from '/@src/composable/useError'

export function useSubmitHandler() {
  const isLoading = ref(false)
  const router = useRouter()
  const notify = useNotyf()
  const $fetch = useFetch()

  async function submitHandler(
    pathUrl: string,
    values: any,
    params: string | any,
    formData: boolean,
    setFieldError: (fieldName: any, errorMessage: any) => void,
    routePath: string,
  ): Promise<boolean> {
    if (!isLoading.value) {
      isLoading.value = true
      try {
        const url = params ? `${pathUrl}/${params}` : pathUrl
        const method = params && !formData ? 'PUT' : 'POST'
        await $fetch(url, { method: method, body: values })
        if (params) {
          notify.success(`Datos Actualizados Correctamente!`)
        }
        else {
          notify.success(`Datos Guardados Correctamente!`)
        }
        await router.push({ path: routePath })
        return true
      }
      catch (err: any) {
        if (err && err.response && err.response._data && err.response._data.errors) {
          const errors = err.response._data.errors
          for (const key in errors) {
            if (Object.prototype.hasOwnProperty.call(errors, key)) {
              const errorMessage = errors[key][0]
              setFieldError(key, errorMessage)
            }
          }
        }
        notify.error('Error al guardar los datos')
        return false
      }
      finally {
        isLoading.value = false
      }
    }
    return false
  }

  async function deleteHandler(endpoint: string, id: number) {
    try {
      await $fetch(`${endpoint}/${id}`, { method: 'DELETE' })
      notify.success(`Datos eliminados Correctamente!`)
    }
    catch (err: any) {
      notify.error(formatError(err))
    }
  }

  return { submitHandler, deleteHandler, isLoading }
}
