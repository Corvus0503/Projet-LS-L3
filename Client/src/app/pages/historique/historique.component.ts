import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Historique } from '../../interfaces/historique';

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.css'
})
export class HistoriqueComponent {
  historiques : any
  listBes : any
  smm : number = 0

  constructor (
    private _formBuilder: FormBuilder,
    private _api : ApiService
  ) {}

  mergedFormGroup = this._formBuilder.group({
    an: ['', Validators.required],
  });

  getHistorique() {
    console.log('date : ', this.mergedFormGroup.value.an)
    this._api.find('/historique/', this.mergedFormGroup.value.an).subscribe((data: Historique[]) => {
      this.historiques = data;
      console.log("his : ", JSON.parse(this.historiques[0].HIST_PREV))
      this.listBes = JSON.parse(this.historiques[0].HIST_PREV)
      this.listBes.forEach((item: any )=> {
        this.smm += item.TOTAL;
    });
    })
  }
  
}
