import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Service } from '../../interfaces/service';
import { CommonModule } from '@angular/common';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { ModServiceComponent } from './mod-service/mod-service.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    ModServiceComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements AfterViewInit {
  dataSource : any;
  donnee : any
  isLoaded = false

  thList = [
    "CODE_SER", 
    "LIBELLE", 
    "SIGLE", 
    "VILLE", 
    "ADRESSE", 
    "CONTACT",
    "ACTION"
  ]

  constructor(
    private _api: ApiService
  ) {}

  ngOnInit(){
    this.getService()
    console.log(this.dataSource)
  }

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getService() {
    this._api.getAll('/service').subscribe((data: Service[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.isLoaded = true;
    })
  }

  getInfo(don: any){
    this.donnee = don
  }

  infoChangedHandler(donnees: any){
    this.donnee = donnees
  }

  deleteService(id: string){
    Swal.fire({
      title: "Etes vous sûr de supprimer ce sevice?",
      text: "Cette action est irreversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this._api.delete('/service/', id).subscribe((res:any) => {
          console.log('user deleted successfully!');
          this.getService()
        })

        Swal.fire({
          title: "Supprimé!",
          text: "Ce service a été supprimé.",
          icon: "success"
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
