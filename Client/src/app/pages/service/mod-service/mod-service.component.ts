import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
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
export class ModServiceComponent implements OnChanges  {
  @Input() donnees : any
  mod : boolean = false
  @Output() donneesChanged : EventEmitter<any> = new EventEmitter

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

  ngOnInit(){
    console.log("don : ",this.donnees)
  }

  ngOnChanges(changes: SimpleChanges){
    for (let property in changes){
      if (property === 'donnees'){
        console.log('Previous', changes[property].previousValue)
        console.log('Current', changes[property].currentValue)
        console.log('Firstchange', changes[property].firstChange)
        console.log('---------------------------------------------')
        if (changes[property].firstChange == false){
          this.onOpenModal()
          this.mod = true
          this.mergedFormGroup = this._formBuilder.group({
            CODE_SER: [this.donnees.CODE_SER, Validators.required],
            LIBELLE: [this.donnees.LIBELLE, Validators.required],
            ENTETE1: [this.donnees.ENTETE1, Validators.required],
            ENTETE2: [this.donnees.ENTETE2, Validators.required],
            ENTETE3: [this.donnees.ENTETE3, Validators.required],
            ENTETE4: [this.donnees.ENTETE4, Validators.required],
            ENTETE5: [this.donnees.ENTETE5, Validators.required],
            SIGLE: [this.donnees.SIGLE, Validators.required],
            VILLE: [this.donnees.VILLE, Validators.required],
            ADRESSE: [this.donnees.ADRESSE, Validators.required],
            CONTACT: [this.donnees.CONTACT, Validators.required],
          })
        }    
      }
    }
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
      this.mergedFormGroup = this._formBuilder.group({
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
      this.mod = false
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

  editSer(event: Event){
    event.preventDefault();
    console.log(this.mergedFormGroup.value)
    Swal.fire({
      title: "Etes vous sûr?",
      text: "Vous allez enregistrer ces modification",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Enregistrer",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this._api.update("/service/", this.donnees.CODE_SER,this.mergedFormGroup.value).subscribe((res:any) => {
            console.log('Post created successfully!');
            Swal.fire({
              title: "Enregtré!",
              text: "La modification a été enregistré.",
              icon: "success"
            });
            this.onCloseModal()
        })

        
      }
    });
    
  }

}
