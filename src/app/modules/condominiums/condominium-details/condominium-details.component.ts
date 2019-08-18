import { Component, OnInit } from '@angular/core';
import { CondominiumService } from '../condominium.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-condominium-details',
  templateUrl: './condominium-details.component.html',
  styleUrls: ['./condominium-details.component.scss']
})
export class CondominiumDetailsComponent implements OnInit {

  private condominium: Condominium;
  private apartments: Array<Apartment>;
  isLoading = true;

  constructor(private condominiumService: CondominiumService, private route: ActivatedRoute, private titleService: Title, private router: Router) {  }
    
  ngOnInit() {
    this.titleService.setTitle('Sm@rtCondo - Condomínio detalhe');

    let condominiumId = this.route.snapshot.paramMap.get("id");
    
    if(condominiumId){
      this.condominiumService.getCondominiumById(condominiumId)
      .subscribe(result => {  
        this.condominium = result;
        this.isLoading = false;
      });
    }
  }

  inApartmentDetailsRoute(){
    return this.router.url.includes('apartments');
  }

  comeBack(condominium){
    if(condominium && this.inApartmentDetailsRoute()){
      this.router.navigate(['/condominiums', condominium.id]);
      this.titleService.setTitle('Sm@rtCondo - Condomínio detalhe');
    }
    else{
      this.router.navigate(['/dashboard']);
      this.titleService.setTitle('Sm@rtCondo - Dashboard');
    }
  }
}
