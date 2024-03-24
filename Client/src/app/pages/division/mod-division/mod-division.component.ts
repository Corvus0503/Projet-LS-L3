import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Service } from '../../../interfaces/service';

@Component({
  selector: 'app-mod-division',
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
  templateUrl: './mod-division.component.html',
  styleUrl: './mod-division.component.css'
})
export class ModDivisionComponent {
    serName: Service[] = []

    constructor(
      private _formBuilder: FormBuilder,
      private _api: ApiService
    ){}

    ngOnInit(){
      this.getService()
    }

    getService() {
      this._api.getAll('/service').subscribe((data: Service[]) => {
        this.serName = data
        console.log(this.serName)
      })
    }

    mergedFormGroup = this._formBuilder.group({
      CODE_DIVISION: ['', Validators.required],
      CODE_SER: ['', Validators.required],
      LABEL_DIVISION: ['', Validators.required],
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
