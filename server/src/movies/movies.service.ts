import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import fetch from "node-fetch"

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  async getMovies(): Promise<any> {
    const url = 'https://api.themoviedb.org/3/trending/movie/day'; 

    try {
        const response = await firstValueFrom(this.httpService.get(url));
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.AUTH_TOKEN}`
            }
        };
        fetch(url, options)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error('error:' + err));
        return response.data;
    } catch (error) {
      throw new Error(`Error al obtener las películas: ${error.message}`);
    }
  }
}
