import axios, { AxiosResponse } from 'axios';

export class AxiosService {
  private apiClient = axios.create({
    baseURL: 'https://andruxnet-world-cities-v1.p.rapidapi.com/',
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  public getAxiosCall = async (endpoint: string) => {
    try {
      return this.apiClient.get<AxiosResponse>(
        endpoint
      ) as unknown as AxiosResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('error message: ', error.message);
        return { data: null, error };
      } else {
        console.error('unexpected error: ', error);
        return { data: null, error: 'An unexpected error occurred' };
      }
    }
  };
}
