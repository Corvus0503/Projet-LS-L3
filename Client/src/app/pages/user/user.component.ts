import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { Agent } from '../../interfaces/agent';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
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
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements AfterViewInit {
  dataSource : any;
  isLoaded = false

  thList = [
    "PHOTO",
    "MATRICULE",
    "FONCTION_AG",
    "NOM_AG",
    "ADRESSE_AG",
    "TEL_AG",
    "ACTIVATION",
    "ACTION"
  ]

  ngOnInit(){
    this.getUSer()
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

  constructor(
    private _api: ApiService,
    private _router: Router
  ){}

  getUSer(){
    this._api.getAll('/admin/userList').subscribe((data: Agent[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.isLoaded = true
    })
  }

  getUserDet(id: string){
    
  }

  deleteUser(id: string){
    Swal.fire({
      title: "Etes vous sûr de supprimer cet utilisateur?",
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
          this.getUSer()
        })

        Swal.fire({
          title: "Supprimé!",
          text: "Cet utilisateur a été supprimé.",
          icon: "success"
        });
      }
    });
    
    
  }

  newUser(){
    this._router.navigate(['/PB/new_user'])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
