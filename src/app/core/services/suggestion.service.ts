import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Suggestion } from '../../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  
  private suggestionUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) { }

  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }

  getSuggestionById(id: number): Observable<Suggestion> {
  return this.http.get<any>(`${this.suggestionUrl}/${id}`).pipe(
    map((response: any) => response.suggestion)  
  );
}

  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.suggestionUrl, suggestion);
  }

  deleteSuggestion(id: number): Observable<any> {
    return this.http.delete(`${this.suggestionUrl}/${id}`);
  }

  updateSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.suggestionUrl}/${suggestion.id}`, suggestion);
  }

 incrementLikes(id: number): Observable<Suggestion> {
    return this.getSuggestionById(id).pipe(
      map((suggestion: Suggestion) => {
        suggestion.nbLikes++;
        return suggestion;
      }),
      // Puis on met à jour sur le serveur
      // Pour l'instant, on fait juste un GET et on incrémente localement
    );}
}