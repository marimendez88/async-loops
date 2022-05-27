import axios, { AxiosResponse } from 'axios';

export class AxiosService {

  private options = {
    method: 'GET',
    url: 'https://andruxnet-world-cities-v1.p.rapidapi.com/',
    params: { query: 'paris'},
    headers: {
      'X-RapidAPI-Host': 'andruxnet-world-cities-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'caf5bed8cfmsh16cc6f2d6d50430p18c245jsn06404677e942'
    }
  };

  public getAxiosCall = async (queryPassed: string) => {
    try {
      this.options.params.query = queryPassed;
      return axios.request(this.options);
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
