import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: any;
  user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Add your bio here.'
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.userProfile = data;
      },
      (error) => {
        console.error('Error loading user profile', error);
      }
    );
  }

  // saveProfile(): void {
  //   this.userService.updateUserProfile(this.user).subscribe(
  //     (data) => {
  //       console.log('Profile updated successfully', data);
  //     },
  //     (error) => {
  //       console.error('Error updating user profile', error);
  //     }
  //   );
  // }
  

  resetProfile(): void {
    this.user = {
      name: 'John Doe',
      email: '',
      bio: 'Add your bio here.'
    };
  }
}
