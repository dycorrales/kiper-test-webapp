import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-resident-apartment-form',
  templateUrl: './resident-apartment-form.component.html',
  styleUrls: ['./resident-apartment-form.component.scss']
})
export class ResidentApartmentFormComponent implements OnInit {

  private residentForm: FormGroup;
  condominiums: Array<Combobox>;
  apartments: Array<Combobox>;
  isLoading = true;
  residentId: string;
  @Output()
  public resident: EventEmitter<any> = new EventEmitter<any>();

  constructor(private titleService: Title, private route: ActivatedRoute, private residentService: ResidentService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router, private condominiumService: CondominiumService,
    private apartmentService: ApartmentService) {

  }

  ngOnInit() {
    this.residentForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]),
      birthday: this.fb.control('', [Validators.required]),
      phoneNumber: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      documentNumber: this.fb.control('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
    });
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

  insertResident() {
    if (this.residentForm.valid) {
      let data = {
        name: this.residentForm.value.name,
        birthday: this.residentForm.value.birthday,
        phoneNumber: this.residentForm.value.phoneNumber,
        email: this.residentForm.value.email,
        documentNumber: this.residentForm.value.documentNumber
      };

      this.resident.emit(data);
      this.residentForm.reset();
    }
  }
}
