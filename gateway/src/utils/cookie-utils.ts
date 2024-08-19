import { Response } from 'express';
import * as process from 'process';

export class CookieUtils {
  static setRefreshToken(response: Response, token: string) {
    const refreshTtl = process.env.REFRESH_COOKIE_TTL;
    const expires = new Date(Date.now() + parseInt(refreshTtl, 10));

    const oldRefreshToken = response.cookie['refreshToken'];
    if (oldRefreshToken) {
      response.clearCookie('refreshToken');
    }

    response.cookie('refreshToken', token, {
      httpOnly: true,
      expires,
      path: '/',
    });
  }

  static getRefreshToken(request: any) {
    return request.cookies['refreshToken'];
  }
}
