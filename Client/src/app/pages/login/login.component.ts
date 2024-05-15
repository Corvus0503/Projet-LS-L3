import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Agent } from '../../interfaces/agent';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false
  errorMessage: any
  agents : Agent[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ){}

  loginForm = this._formBuilder.group({
    pseudo: ['', Validators.required],
    mdp: ['', Validators.required],
  })
  ngOnInit(): void {
      this.isUserLogin()
      if (this.isLogin == true){
        this._router.navigate(['/PB/dashboard'])
      }
  }

  onSubmit(){
    console.log("user data : ", this.loginForm.value)
    this._api.postTypeRequest('/admin', this.loginForm.value).subscribe((data: Agent[]) => {
      this.agents = data
      console.log(this.agents)
      if (this.agents != null){
        this._auth.setDataInLocalStorage('userData', JSON.stringify(this.agents))
        this._router.navigate(['/PB/dashboard'])
      } else {
        console.log('error')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Nom d\'utilisateur ou mot de passe incorrect ou mot de passer incorrect',
      })
      }
    })
  }

  isUserLogin(){
    if(this._auth.getUserDetails() !=null){
      this.isLogin = true
    }
  }

}
