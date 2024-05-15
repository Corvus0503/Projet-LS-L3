import { Component, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Agent } from '../../../interfaces/agent';

@Component({
  selector: 'app-det-user',
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
  templateUrl: './det-user.component.html',
  styleUrl: './det-user.component.css'
})
export class DetUserComponent {
  userInfo : any = []
  userDet: any 
  userAv: string = '../../../assets/uploads/noAv.gif'
  userName: string = ''
  mergedFormGroup: any
  imageUrl: string = ''
  sub!: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _api: ApiService,
    private _router: Router
  ) {}

  ngOnInit(){
    this.userInfo = ['nfo'];
    this.sub = this._ActivatedRoute.paramMap.subscribe(params =>{
      console.log('paam = ', params.get('id'))
      this._api.find('/admin/', params.get('id')).subscribe((data: Agent[]) => {
        this.userDet = data
        console.log("USer : ", data);
        if (this.userDet[0].PHOTO != null){
          this.userAv = '../../../assets/uploads/' + this.userDet[0].PHOTO;
        }

        if (this.userDet && this.userDet.length > 0) {
          this.mergedFormGroup = this._formBuilder.group({
            NOM_AG: [this.userDet[0].NOM_AG, Validators.required],
            PRENOM_AG: [this.userDet[0].PRENOM_AG, Validators.required],
            GENRE: [this.userDet[0].GENRE, Validators.required],
            ADRESSE_AG: [this.userDet[0].ADRESSE_AG, Validators.required],
            TYPE_AG: [this.userDet[0].TYPE_AG, Validators.required],
            MAIL_AG: [this.userDet[0].MAIL_AG, Validators.email],
            TEL_AG: [this.userDet[0].TEL_AG, Validators.required],
            MATRICULE: [this.userDet[0].MATRICULE, Validators.required],
            NOM_UTIL_AG: [this.userDet[0].NOM_UTIL_AG, Validators.required],
            CODE_DIVISION: [this.userDet[0].CODE_DIVISION, Validators.required],
            FONCTION_AG: [this.userDet[0].FONCTION_AG, Validators.required],
            PASSWORD: ['', Validators.required],
            C_PASSWORD: ['', Validators.required]
          });
        }
      })
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.previewImage(file);
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      console.log(this.imageUrl)
    };
  }

  onsubmit(){
    console.log(this.mergedFormGroup.value.NOM_AG)
    Swal.fire({
      title: "Etes vous sûr?",
      text: "Vous allez enregistrer modifier les informations cet utilisateur",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enregistrer",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this._api.update("/admin/", this.mergedFormGroup.value.MATRICULE,{
            MATRICULE: this.mergedFormGroup.value.MATRICULE,
            FONCTION_AG: this.mergedFormGroup.value.FONCTION_AG,
            MAIL_AG: this.mergedFormGroup.value.MAIL_AG,
            NOM_AG: this.mergedFormGroup.value.NOM_AG,
            NOM_UTIL_AG: this.mergedFormGroup.value.NOM_UTIL_AG,
            TYPE_AG: this.mergedFormGroup.value.TYPE_AG,
            PRENOM_AG: this.mergedFormGroup.value.PRENOM_AG,
            ADRESSE_AG: this.mergedFormGroup.value.ADRESSE_AG,
            TEL_AG: this.mergedFormGroup.value.TEL_AG,
            PASSWORD: "1234",
            PHOTO: null,
            GENRE: this.mergedFormGroup.value.GENRE,
            ACTIVATION: "activé",
            CODE_DIVISION: this.mergedFormGroup.value.CODE_DIVISION,
        }).subscribe((res:any) => {
            console.log('Post created successfully!');
          })

        Swal.fire({
          title: "Enregtré!",
          text: "Modification a été enregistré.",
          icon: "success"
        });
        this._router.navigate(['PB/user'])
      }
    });
    
  }
}
