import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { Division } from '../../interfaces/division';
import { ApiService } from '../../services/api.service';
import { ModDivisionComponent } from './mod-division/mod-division.component';

@Component({
  selector: 'app-division',
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
    ModDivisionComponent
  ],
  templateUrl: './division.component.html',
  styleUrl: './division.component.css'
})
export class DivisionComponent implements AfterViewInit {
  dataSource : any;

  thList = [
    "CODE_DIVISION", 
    "CODE_SER", 
    "LABEL_DIVISION",
    "ACTION"
  ]

  constructor(
    private _api: ApiService
  ) {}

  ngOnInit(){
    this.getDivision()
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

  getDivision() {
    this._api.getAll('/division').subscribe((data: Division[]) => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  deleteService(id: string){
    Swal.fire({
      title: "Etes vous sûr de supprimer cette division?",
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
          this.getDivision()
        })

        Swal.fire({
          title: "Supprimé!",
          text: "Cette division a été supprimé.",
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
