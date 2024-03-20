import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Agent } from '../../interfaces/agent';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false
  errorMessage: any
  agents : Agent[] = []

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ){}

  ngOnInit(): void {
      this.isUserLogin()
      if (this.isLogin == true){
        this._router.navigate(['/PB/dashboard'])
      }
  }

  onSubmit(form: NgForm){
    console.log("user data : ", form.value)
    this._api.postTypeRequest('/admin', form.value).subscribe((data: Agent[]) => {
      this.agents = data
      console.log(this.agents)
      if (this.agents != null){
        this._auth.setDataInLocalStorage('userData', JSON.stringify(this.agents))
        this._router.navigate(['/PB/dashboard'])
      } else {
        console.log('error')
        alert('Pseudo ou mot de passe incorrect')
      }
    })
  }

  isUserLogin(){
    if(this._auth.getUserDetails() !=null){
      this.isLogin = true
    }
  }

}
