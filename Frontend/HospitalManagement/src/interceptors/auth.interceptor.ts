import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // 🔐 Token পড়া
    if (token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` } // 🔥 Token Header এ পাঠানো
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
