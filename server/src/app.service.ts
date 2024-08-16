import fetch from 'node-fetch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const url =
      'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    };

    return fetch(url, options)
      .then((res) => res.json())
      .catch((err) => console.error('error:' + err));
  }
}
