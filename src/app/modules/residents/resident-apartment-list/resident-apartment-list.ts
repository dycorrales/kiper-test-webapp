import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ResidentService } from '../resident.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Resident } from 'app/modules/apartments/apartment.model';

@Component({
  selector: 'app-resident-apartment-list',
  templateUrl: './resident-apartment-list.html',
  styleUrls: ['./resident-apartment-list.scss']
})
export class ResidentApartmentListComponent implements OnInit {

  searshText: string;
  residents: Array<Resident>;
  
  @Output()
  public residentsResult: EventEmitter<Resident> = new EventEmitter<Resident>();


 constructor(private residentService: ResidentService, private toastr: ToastrService) {
    this.residents = new Array<Resident>();
  }

  ngOnInit() {
  }

  deleteResident(resident: Resident){
    const index = this.residents.findIndex(r => r.name === resident.name);
    this.residents.splice(index, 1);
  }

  insertResident(resident){
    this.residents.push(resident);
    this.residentsResult.emit(resident);
  }
}
