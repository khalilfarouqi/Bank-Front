import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  role!: string; 

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.role = this.authService.getRole();
  }

  logout() {
    this.authService.logout();
  }

}
