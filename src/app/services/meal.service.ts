import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Makes the service available application-wide
})
export class MealService {

  private apiUrl = 'http://localhost:8080/api/meals';  

  constructor(private http: HttpClient) {}

  // Fetch all meals
  getMeals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new meal
  addMeal(meal: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, meal);
  }

  // Edit an existing meal
  updateMeal(mealId: number, updatedMeal: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${mealId}`, updatedMeal);
  }

  // Delete a meal
  deleteMeal(mealId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${mealId}`);
  }
}
