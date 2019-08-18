import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ResidentService } from '../resident.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CondominiumService } from 'app/modules/condominiums/condominium.service';
import { Combobox } from 'app/helpers/combobox';
import { ApartmentService } from 'app/modules/apartments/apartment.service';

@Component({
  selector: 'app-resident-form',
  templateUrl: './resident-form.component.html',
  styleUrls: ['./resident-form.component.scss']
})
export class ResidentFormComponent implements OnInit {

  private residentForm: FormGroup;
  condominiums: Array<Combobox>;
  apartments: Array<Combobox>;
  isLoading = true;
  residentId: string;
  resident: Resident;

  constructor(private titleService: Title, private route: ActivatedRoute, private residentService: ResidentService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router, private condominiumService: CondominiumService,
    private apartmentService: ApartmentService) {

  }

  ngOnInit() {
    this.titleService.setTitle('Sm@rtCondo - Cadastro Morador');

    this.residentId = this.route.snapshot.paramMap.get("id");

    this.condominiumService.getAllCondominiums()
      .subscribe(result => {
        this.condominiums = result;

        if (!this.residentId) {
          this.isLoading = false;
          this.initForm();
        }
        else
          this.getResident();
      });
  }

  initForm() {
    this.residentForm = this.fb.group({
      condominiumId: this.fb.control('', [Validators.required]),
      apartmentId: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]),
      birthday: this.fb.control('', [Validators.required]),
      phoneNumber: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      documentNumber: this.fb.control('', [Validators.required])
    });
  }

  loadApartments(condominiumId) {
    this.apartmentService.getAllApartmentsByCondominiumId(condominiumId)
      .subscribe(result => {
        this.apartments = result;

        if(this.residentId){
          this.fillForm(this.resident);
        }
      });
  }

  getResident() {
    if (this.residentId) {
      this.residentService.getById(this.residentId)
        .subscribe(resident => {
            this.resident = resident;
            this.loadApartments(resident.condominiumId);
        });
    }
  }

  fillForm(resident) {
    this.initForm();

    this.residentForm.controls['name'].setValue(resident.name);
    this.residentForm.controls['condominiumId'].setValue(resident.condominiumId);
    this.residentForm.controls['apartmentId'].setValue(resident.apartmentId);
    this.residentForm.controls['birthday'].setValue(resident.birthday);
    this.residentForm.controls['phoneNumber'].setValue(resident.phoneNumber);
    this.residentForm.controls['email'].setValue(resident.email);
    this.residentForm.controls['documentNumber'].setValue(resident.document);

    this.isLoading = false;
  }

  getEmailErrorMessage() {
    return this.residentForm.controls['email'].hasError('required') ? 'email é requerido' :
      this.residentForm.controls['email'].hasError('email') ? 'email não válido' : '';
  }

  isValidForm() {
    if (this.residentForm.valid)
      return true;

    return false;
  }

  saveResident() {
    if (this.residentForm.valid) {
      var data = {
        name: this.residentForm.value.name,
        birthday: this.residentForm.value.birthday,
        phoneNumber: this.residentForm.value.phoneNumber,
        email: this.residentForm.value.email,
        documentNumber: this.residentForm.value.documentNumber
      }

      let apartmentId = this.residentForm.value.apartmentId;
      let condominiumId = this.residentForm.value.condominiumId;

      if(this.residentId){
        this.residentService.updateResident(condominiumId, apartmentId, this.residentId, data)
        .subscribe(result => {
          this.toastr.success(result.notifications[0].value, 'Sucesso!');
          this.router.navigate(['/residents']);
        });
      }
      else {
        this.residentService.registerResident(condominiumId, apartmentId, data)
          .subscribe(result => {
            this.toastr.success(result.notifications[0].value, 'Sucesso!');
            this.router.navigate(['/residents']);
          });
      }
    }
  }
}
