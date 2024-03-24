import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mod-service',
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
  templateUrl: './mod-service.component.html',
  styleUrl: './mod-service.component.css'
})
export class ModServiceComponent {

  constructor(
    private _formBuilder: FormBuilder,
    private _api: ApiService
  ){}

  mergedFormGroup = this._formBuilder.group({
    CODE_SER: ['', Validators.required],
    LIBELLE: ['', Validators.required],
    ENTETE1: ['', Validators.required],
    ENTETE2: ['', Validators.required],
    ENTETE3: ['', Validators.required],
    ENTETE4: ['', Validators.required],
    ENTETE5: ['', Validators.required],
    SIGLE: ['', Validators.required],
    VILLE: ['', Validators.required],
    ADRESSE: ['', Validators.required],
    CONTACT: ['', Validators.required],
  });

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
      text: "Vous allez enregistrer ce service",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enregistrer",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this._api.postTypeRequest("/service", this.mergedFormGroup.value).subscribe((res:any) => {
            console.log('Post created successfully!');
        })

        Swal.fire({
          title: "Enregtré!",
          text: "Un nouveau service a été enregistré.",
          icon: "success"
        });
        this.onCloseModal()
      }
    });
    
  }

}
