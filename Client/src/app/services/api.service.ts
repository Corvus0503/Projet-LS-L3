import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = "http://localhost:8080"

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private httpClient: HttpClient) { }

  getAll(url: string): Observable<any> {
    return this.httpClient.get(this.baseURL + url)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(url: any, id: any): Observable<any> {
    return this.httpClient.get(`${this.baseURL}${url}${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
   }
  postTypeRequest(url: any, payload: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}${url}`, payload, {headers: this.httpHeaders})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(url: string, id: string, payload: any): Observable<any>{
    return this.httpClient.put(`${this.baseURL}${url}${id}`, payload, {headers: this.httpHeaders})
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(url: string, id: string): Observable<any>{
    return this.httpClient.delete(`${this.baseURL}${url}${id}`, {headers: this.httpHeaders})
    .pipe(
      catchError(this.errorHandler)
    );
  }


  errorHandler (error : any){
    let errorMessage = ''
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message
    } else{
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    return errorMessage
  }
}
