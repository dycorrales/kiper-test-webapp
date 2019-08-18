import { Component, OnInit, Input } from '@angular/core';
import { ResidentService } from '../resident.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resident-list',
  templateUrl: './resident-list.component.html',
  styleUrls: ['./resident-list.component.scss']
})
export class ResidentListComponent implements OnInit {

  searshText: string;
  @Input() 
  residents: Array<Resident>;
  @Input()
  isLoading = true;
  @Input()
  apartment: Apartment;


 constructor(private residentService: ResidentService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  deleteResident(resident: Resident){
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
        this.residentService.deleteResident(this.apartment.condominiumId, this.apartment.id, resident.residentId).subscribe((result: any) =>{
          this.toastr.success(result.notifications[0].value, 'Sucesso!');
          this.getResidentsByApartmentId(this.apartment.condominiumId, this.apartment.id);
        });
      }
    });
  }

  getResidentsByApartmentId(condominiumId, apartmentId) {
    this.residentService.getResidentsByApartmentId(condominiumId, apartmentId)
    .subscribe(result => {  
      this.residents = result;
    });
  }
}
