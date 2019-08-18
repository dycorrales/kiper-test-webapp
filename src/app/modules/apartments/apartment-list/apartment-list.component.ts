import { Component, OnInit, Input } from '@angular/core';
import { ApartmentService } from '../apartment.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss']
})
export class ApartmentListComponent implements OnInit {

  apartments: Array<Apartment>;
  residents: Array<Resident>;
  @Input()
  isLoading = true;

  apartment: Apartment;
  apartmentExpanded: boolean = false;
  searshText: string;

  constructor(private apartmentService: ApartmentService, private route: ActivatedRoute, private router: Router,
    private toastr: ToastrService) {

  }

  condominiumId: string;

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.condominiumId = params['id'];
      this.getApartments(this.condominiumId);
    });
  }

  deleteApartment(apartment: Apartment) {
    Swal.fire({
      title: `Eliminar apartamento`,
      html: `O apartamento numero ${apartment.number} será eliminado. <br>Deseja continuar?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, realizar operação!',
      cancelButtonText: 'Não, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.apartmentService.deleteApartment(this.condominiumId, apartment.id).subscribe((result: any) => {
          this.toastr.success(result.notifications[0].value, 'Sucesso!');
          this.getApartments(this.condominiumId);
        });
      }
    });
  }

  getApartments(condominiumId) {
    this.apartmentService.getApartmentsByCondominioId(condominiumId)
      .subscribe(apartments => {
        this.apartments = apartments;
        this.isLoading = false;
    });
  }
}
