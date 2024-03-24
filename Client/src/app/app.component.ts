import { Component, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { AuthService } from './services/auth.service';
import { Agent } from 'http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterLink, 
    LoginComponent, 
    MatSidenav,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-app';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = false;
  isLogin: boolean = false
  userInfo : any
  userAv: string = ''
  userName: string = ''

  navList = [
    {name: "Dashboard", icon: "../assets/img/dashboard_layout_28px.png", path: "/dashboard"},
    {name: "Prevision", icon: "../assets/img/calculator_23px.png", path: "/prevision"},
    {name: "Besoin", icon: "../assets/img/view_details_28px.png", path: "/besoin"},
    {name: "Utilisateur", icon: "../assets/img/user_28px.png", path: "/user"},
    {name: "Deconnexion", icon: "../assets/img/exit_25px.png", path: "/dashboard"},
  ]


  constructor(
    private observer: BreakpointObserver,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    if(this._auth.getUserDetails() != null){
      this.isLogin = true
    }

    this.userInfo = this._auth.getUserDetails();
    if (this.userInfo && this.userInfo.length > 0) {
      this.userAv = '../assets/uploads/' + this.userInfo[0].PHOTO;
      this.userName = this.userInfo[0].NOM_UTIL_AG;
      console.log("user:", this.userAv);
    }

    
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  nonPad(){
    if(this.isLogin){
      return 'withTop'
    }else{
      return 'noTop'
    }
  }

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  
}
