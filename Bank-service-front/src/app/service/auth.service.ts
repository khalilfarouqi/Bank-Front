import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/authenticate';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<AuthResponse> {
    
    console.log("username ----->   " + username)
    console.log("password ----->   " + password)
    console.log("url ----->   " + this.authUrl, { username, password })

    return this.http.post<AuthResponse>(this.authUrl, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.jwt);
        this.router.navigate(['/']);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
