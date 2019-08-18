import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApartmentService } from '../apartment.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CondominiumService } from 'app/modules/condominiums/condominium.service';
import { Combobox } from 'app/helpers/combobox';
import { Apartment } from '../apartment.model';

@Component({
  selector: 'app-apartment-details-list',
  templateUrl: './apartment-details-list.component.html',
  styleUrls: ['./apartment-details-list.component.scss']
})
export class ApartmentDetailsListComponent implements OnInit {

  apartments: Array<Apartment>;
  searshText: string;
  isLoading = true;
  condominiumId: string;
  condominiums: Array<Combobox>;

  constructor(private titleService: Title, private apartmentService: ApartmentService, private toastr: ToastrService,
    private router: Router, private condominiumService: CondominiumService) { }

  ngOnInit() {
    this.titleService.setTitle('Sm@rtCondo - Apartamentos');

    this.condominiumService.getAllCondominiums()
    .subscribe(result => {      
      if(result.length > 0) {
        this.condominiums = result;
        this.condominiumId = this.condominiums[0].id;  
        this.getApartments(this.condominiumId);  
      }    
      else{
        this.isLoading = false;
      }
    });
  }

  newApartment(){
      this.router.navigate(['apartments/new']);
  }

  deleteApartment(apartment: Apartment){
    Swal.fire({
      title: `Eliminar apartamento`,
      html: `O apartamento ${apartment.number} será eliminado. <br>Deseja continuar?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, realizar operação!',
      cancelButtonText: 'Não, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.apartmentService.deleteApartment(this.condominiumId, apartment.id).subscribe((result: any) =>{
          this.toastr.success(result.notifications[0].value, 'Sucesso!');
          this.getApartments(this.condominiumId);
        });
      }
    });
  }

  updateApartment(apartment) {
    this.router.navigate([`apartments/${apartment.id}`], { queryParams: { condominiumId: this.condominiumId } });
  }

  getApartments(condominiumId) {
    this.apartmentService.getApartmentsByCondominioId(condominiumId)
    .subscribe(result => {  
      this.apartments = result;
      this.isLoading = false;
    });
  }
}
