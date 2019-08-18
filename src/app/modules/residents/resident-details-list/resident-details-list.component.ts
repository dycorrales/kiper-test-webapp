import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ResidentService } from '../resident.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resident-details-list',
  templateUrl: './resident-details-list.component.html',
  styleUrls: ['./resident-details-list.component.scss']
})
export class ResidentDetailsListComponent implements OnInit {

  residents: Array<ResidentDetails>;
  searshText: string;
  isLoading = true;

  constructor(private titleService: Title, private residentService: ResidentService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Sm@rtCondo - Moradores');

    this.getResidents();
  }

  newResident(){
      this.router.navigate(['residents/new']);
  }

  deleteResident(resident: ResidentDetails){
    Swal.fire({
      title: `Eliminar morador`,
      html: `O morador ${resident.name} será eliminado. <br>Deseja continuar?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, realizar operação!',
      cancelButtonText: 'Não, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.residentService.deleteResident(resident.condominiumId, resident.apartmentId, resident.id).subscribe((result: any) =>{
          this.toastr.success(result.notifications[0].value, 'Sucesso!');
          this.getResidents();
        });
      }
    });
  }

  updateResident(resident) {
    this.router.navigate([`residents/${resident.id}`]);
  }

  getResidents() {
    this.residentService.getResidents()
    .subscribe(result => {  
      this.residents = result;
      this.isLoading = false;
    });
  }
}
