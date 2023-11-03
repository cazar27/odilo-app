import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  private token = environment.githubApiToken;
  
  intercept( request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    return next.handle(modifiedRequest);
  }
}
