import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(private readonly httpService: HttpService) {}

  async getCategories(): Promise<any> {
    const url = 'https://api.themoviedb.org/3/genre/movie/list'; 
    try {
        const response = await firstValueFrom(this.httpService.get(url, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
            },
            params: {
              language: 'en-US',
            },
        }));
        return response.data;
    } catch (error) {
      throw new Error(`Error al obtener las películas: ${error.message}`);
    }
  }
}
