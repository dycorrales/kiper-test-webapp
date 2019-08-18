import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApartmentService } from '../apartment.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CondominiumService } from 'app/modules/condominiums/condominium.service';
import { Combobox } from 'app/helpers/combobox';
import { Apartment, Resident } from '../apartment.model';

@Component({
  selector: 'app-apartment-form',
  templateUrl: './apartment-form.component.html',
  styleUrls: ['./apartment-form.component.scss']
})
export class ApartmentFormComponent implements OnInit {

  private apartmentForm: FormGroup;
  condominiums: Array<Combobox>;
  isLoading = true;
  id: string;
  condominiumId: string;
  apartment: Apartment;
  residents: Array<Resident>;

  constructor(private titleService: Title, private route: ActivatedRoute, private apartmentService: ApartmentService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router, private condominiumService: CondominiumService) {
      this.residents = new Array<Resident>();

  }

  ngOnInit() {
    this.titleService.setTitle('Sm@rtCondo - Cadastro Apartamento');

    this.id = this.route.snapshot.paramMap.get("id");
    
    this.condominiumService.getAllCondominiums()
      .subscribe(result => {
        this.condominiums = result;

        if (!this.id) {
          this.isLoading = false;
          this.initForm();
        }
        else {
          this.route.queryParamMap.subscribe(params => {
            this.condominiumId = params.get('condominiumId');
            this.getApartment();
          });
        }
      });
  }

  initForm() {
    this.apartmentForm = this.fb.group({
      condominiumId: this.fb.control('', [Validators.required]),
      number: this.fb.control('', [Validators.required, Validators.max(99), Validators.min(1)]),
      roof: this.fb.control('', [Validators.required, Validators.max(99), Validators.min(1)]),
      block: this.fb.control('', [Validators.required, Validators.maxLength(50), Validators.minLength(1)])
    });
  }

  getApartment() {
    if (this.condominiumId && this.id) {
      this.apartmentService.getApartmentById(this.condominiumId, this.id)
        .subscribe(apartment => {
          this.apartment = apartment;
          this.fillForm(this.apartment);
        });
    }
  }

  fillForm(apartment) {
    this.initForm();

    this.apartmentForm.controls['number'].setValue(apartment.number);
    this.apartmentForm.controls['condominiumId'].setValue(apartment.condominiumId);
    this.apartmentForm.controls['roof'].setValue(apartment.roof);
    this.apartmentForm.controls['block'].setValue(apartment.block);

    this.isLoading = false;
  }

  isValidForm() {
    if (this.apartmentForm.valid)
      return true;

    return false;
  }

  insertResident(resident) {
    this.residents.push(resident);
  }

  saveApartment() {
    if (this.apartmentForm.valid) {
      var data = {
        roof: this.apartmentForm.value.roof,
        number: this.apartmentForm.value.number,
        block: this.apartmentForm.value.block,
        residents: []
      }

      let condominiumId = this.apartmentForm.value.condominiumId;

      if (this.id) {
        this.apartmentService.updateApartment(condominiumId, this.id, data)
          .subscribe(result => {
            this.toastr.success(result.notifications[0].value, 'Sucesso!');
            this.router.navigate(['/apartments']);
          });
      }
      else {
        data.residents = this.residents;
        this.apartmentService.registerApartment(condominiumId, data)
          .subscribe(result => {
            this.toastr.success(result.notifications[0].value, 'Sucesso!');
            this.router.navigate(['/apartments']);
          });
      }
    }
  }
}
