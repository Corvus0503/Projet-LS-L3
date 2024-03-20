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
    ModServiceComponent
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements AfterViewInit {
  dataSource : any;

  thList = [
    "CODE_SER", 
    "LIBELLE", 
    "SIGLE", 
    "VILLE", 
    "ADRESSE", 
    "CONTACT"
  ]

  constructor(
    private _api: ApiService
  ) {}

  ngOnInit(){
    this.getService()
    console.log(this.dataSource)
  }

  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(MatPaginator) paginator :any = MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getService() {
    this._api.getAll('/service').subscribe((data: Service[]) => {
      this.dataSource = new MatTableDataSource(data);
    })
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
        this._api.delete('/admin/', id).subscribe((res:any) => {
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
