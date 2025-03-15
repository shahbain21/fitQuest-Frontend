import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user = { name: 'John Doe' }; // Mock user data
  meals = [
    { mealName: 'Oatmeal', calories: 250 },
    { mealName: 'Grilled Chicken', calories: 400 },
    { mealName: 'Salad', calories: 150 }
  ];

  get totalCalories(): number {
    return this.meals.reduce((total, meal) => total + meal.calories, 0);
  }
}
