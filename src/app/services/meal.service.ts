// meal.service.ts - Updated to handle optional fields
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Meal {
  id?: number;
  name: string;
  description?: string;
  calories: number;
  protein?: number;
  fat?: number;
  carbs?: number;
}

@Injectable({ providedIn: 'root' })
export class MealService {
  private apiUrl = 'http://localhost:8080/api/meals';

  constructor(private http: HttpClient) {}

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.apiUrl);
  }

  addMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.apiUrl, meal);
  }

   updateMeal(id: number, updatedMeal: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.apiUrl}/${id}`, updatedMeal);
  }


  deleteMeal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
