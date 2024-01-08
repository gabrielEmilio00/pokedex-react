import { api } from './axios'

export class HttpService {
  public async request(method: string, url: string, data?: unknown) {
    try {
      const response = await api({
        method,
        url,
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.data
    } catch (error) {
      return error
    }
  }
}
