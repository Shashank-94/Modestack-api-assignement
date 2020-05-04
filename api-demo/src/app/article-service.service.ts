import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {

  private apiUrl = "http://localhost:8000/article/";
  constructor(private http: HttpClient) { }

  createArticle(data): Observable<any>{
    return this.http.post<any>(this.apiUrl+'createArticle', data);
  }

  articleList(): Observable<any>{
    const data = {};
    return this.http.get<any>(this.apiUrl+'articleList', data);
  }
}
