import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MealService } from '../../services/meal.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-meals',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule], // Add CommonModule to imports
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  meals: any[] = [];
  newMeal = { name: '', description: '', calories: 0 };
  editMeal: any = null;

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
    if (!this.newMeal.name || !this.newMeal.description || this.newMeal.calories <= 0) return;

    this.mealService.addMeal(this.newMeal).subscribe(() => {
      this.loadMeals();
      this.newMeal = { name: '', description: '', calories: 0 };
    });
  }

  startEdit(meal: any): void {
    this.editMeal = { ...meal };
  }

  saveMeal(): void {
    if (!this.editMeal) return;

    this.mealService.updateMeal(this.editMeal.id, this.editMeal).subscribe(() => {
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