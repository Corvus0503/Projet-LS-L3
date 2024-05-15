import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {AsyncPipe, CommonModule} from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    AsyncPipe,
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
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
  });


  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private _api: ApiService,
    private _router: Router
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  onsubmit(){
    console.log(this.mergedFormGroup.value.NOM_AG)
    Swal.fire({
      title: "Etes vous sûr?",
      text: "Vous allez enregistrer ce utilisateur",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enregistrer",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this._api.postTypeRequest("/admin/newUser", {
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
          text: "Un nouvel utilisateur a été enregistré.",
          icon: "success"
        });
        this._router.navigate(['PB/user'])
      }
    });
    
  }

  returnToList(){
    this._router.navigate(['/user'])
  }
}
