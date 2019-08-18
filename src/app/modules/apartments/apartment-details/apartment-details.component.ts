import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApartmentService } from '../apartment.service';

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.scss']
})
export class ApartmentDetailsComponent implements OnInit {

  apartment: Apartment;
  @Input()
  isLoading = true;

  constructor(private titleService: Title, private route: ActivatedRoute, private apartmentService: ApartmentService) { }

  ngOnInit() {
    this.titleService.setTitle('Sm@rtCondo - Apartamento detalhe');

    this.route.parent.params.subscribe(params => {
      let id = params['id'];
      let apartmentId = this.route.snapshot.paramMap.get("apartmentId");
      if(id && apartmentId){
        this.apartmentService.getApartmentById(id, apartmentId)
        .subscribe(apartment => {
            this.apartment = apartment;
            this.isLoading = false;
        });
      }
    });     
  }
}
