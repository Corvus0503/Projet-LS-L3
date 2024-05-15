import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userInfo : any = []
  userDet: any = []
  userAv: string = ''
  userName: string = ''
  mergedFormGroup = this._formBuilder.group({
    NOM_AG: ['', Validators.required],
    PRENOM_AG: ['', Validators.required],
    GENRE: ['', Validators.required],
    ADRESSE_AG: ['', Validators.required],
    TYPE_AG: ['', Validators.required],
    MAIL_AG: ['', Validators.email],
    TEL_AG: ['', Validators.required],
    MATRICULE: ['', Validators.required],
    NOM_UTIL_AG: ['', Validators.required],
    CODE_DIVISION: ['', Validators.required],
    FONCTION_AG: ['', Validators.required],
    PASSWORD: ['1234', Validators.required],
    C_PASSWORD: ['', Validators.required]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _api: ApiService
  ) {}

  ngOnInit(){
    this.userInfo = this._auth.getUserDetails();
    if (this.userInfo && this.userInfo.length > 0) {
      this.userAv = '../assets/uploads/' + this.userInfo[0].PHOTO;
      this.userName = this.userInfo[0].NOM_UTIL_AG;
      this.userDet = this.userInfo[0]
    }
    this.mergedFormGroup = this._formBuilder.group({
      NOM_AG: [this.userDet.NOM_AG, Validators.required],
      PRENOM_AG: [this.userDet.PRENOM_AG, Validators.required],
      GENRE: [this.userDet.GENRE, Validators.required],
      ADRESSE_AG: [this.userDet.ADRESSE_AG, Validators.required],
      TYPE_AG: [this.userDet.TYPE_AG, Validators.required],
      MAIL_AG: [this.userDet.MAIL_AG, Validators.email],
      TEL_AG: [this.userDet.TEL_AG, Validators.required],
      MATRICULE: [this.userDet.MATRICULE, Validators.required],
      NOM_UTIL_AG: [this.userDet.NOM_UTIL_AG, Validators.required],
      CODE_DIVISION: [this.userDet.CODE_DIVISION, Validators.required],
      FONCTION_AG: [this.userDet.FONCTION_AG, Validators.required],
      PASSWORD: ['', Validators.required],
      C_PASSWORD: ['', Validators.required]
    });
    console.log("USer : ", this.mergedFormGroup.value)
  }

  onOpenModal(){
    const notNull = document.getElementById('myModal')
    if (notNull != null){
      notNull.style.display = 'block'
    }
  }

  onCloseModal(){
    const notNull = document.getElementById('myModal')
    if (notNull != null){
      notNull.style.display = 'none'
    }
  }

  onsubmit(event: Event){
    event.preventDefault();
    console.log(this.mergedFormGroup.value)
    Swal.fire({
      title: "Etes vous sûr?",
      text: "Vous allez enregistrer cette division",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enregistrer",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this._api.postTypeRequest("/division", this.mergedFormGroup.value).subscribe((res:any) => {
            console.log('Post created successfully!');
        })

        Swal.fire({
          title: "Enregtré!",
          text: "Une nouvelle division a été enregistré.",
          icon: "success"
        });
        this.onCloseModal()
      }
    });
  }
}
