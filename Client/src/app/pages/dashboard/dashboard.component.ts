import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Chart from 'chart.js/auto';
import { ApiService } from '../../services/api.service';
import { Prevision } from '../../interfaces/prevision';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public chart: any;
  prev: any
  private labeldata: any[] = [];
  realdata: any[] = [];
  isLoaded = false

  constructor(
    private _api : ApiService
  ){}

  ngOnInit(): void {
    this.getPrevision()
    this.createChart();
  }

  getPrevision() {
    this._api.getAll('/prevision').subscribe((data: Prevision[]) => {
      this.prev = data;
      if (this.prev != null) {
        for (let i = 0; i < this.prev.length; i++) {
          this.labeldata.push(this.prev[i].DATE_PREVISION);
          this.realdata.push(this.prev[i].PREVISION);
        }
      }
      console.log(this.realdata)
      this.createChart();
      this.isLoaded = true
    } )
  }

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'line', 

      data: {
        labels: this.labeldata, 
	       datasets: [
          {
            label: "Montant",
            data: this.realdata,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
}
