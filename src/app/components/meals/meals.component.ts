import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MealService } from '../../services/meal.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Meal {
  id?: number;
  name: string;
  mealType: string;
  calories: number;
  protein?: number;
  fat?: number;
  carbs?: number;
}
@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule],
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  meals: any[] = [];
  mealTypes: string[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  newMeal = { name: '', mealType: '', calories: 0, protein: undefined, fat: undefined, carbs: undefined};
  editMeal: Meal | null = null;


  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.loadMeals();
  }

  loadMeals(): void {
    this.mealService.getMeals().subscribe((data) => {
      this.meals = data;
    });
  }

  addMeal(): void {
    if (!this.newMeal.name.trim() || !this.newMeal.mealType || this.newMeal.calories <= 0) return;

    this.mealService.addMeal(this.newMeal).subscribe(() => {
      this.loadMeals();
      this.newMeal = { name: '', mealType: '', calories: 0, protein: undefined, fat: undefined, carbs: undefined };
    });
  }
  startEdit(meal: Meal): void {
    this.editMeal = { ...meal }; 
  }

  saveMeal(): void {
    if (!this.editMeal || !this.editMeal.name.trim() || !this.editMeal.mealType || this.editMeal.calories <= 0) return;

    this.mealService.updateMeal(this.editMeal.id!, this.editMeal).subscribe(() => {
      this.loadMeals();
      this.editMeal = null;
    });
  }

  deleteMeal(mealId: number): void {
    this.mealService.deleteMeal(mealId).subscribe(() => {
      this.loadMeals();
    });
  }
}
