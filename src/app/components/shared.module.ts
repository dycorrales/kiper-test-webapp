import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NoDataComponent } from './no-data/no-data.component';
import { GrdFilterPipe } from 'app/helpers/filter-pipe';
import { MatProgressSpinnerModule, MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatDatepicker, MatDatepickerModule } from '@angular/material';
import { LoadingInfoComponent } from './loading-info/loading-info.component';
import { CondominiumDetailsComponent } from 'app/modules/condominiums/condominium-details/condominium-details.component';
import { ApartmentListComponent } from 'app/modules/apartments/apartment-list/apartment-list.component';
import { ApartmentDetailsComponent } from 'app/modules/apartments/apartment-details/apartment-details.component';
import { ResidentDetailsListComponent } from 'app/modules/residents/resident-details-list/resident-details-list.component';
import { ResidentListComponent } from 'app/modules/residents/resident-list/resident-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResidentFormComponent } from 'app/modules/residents/resident-form/resident-form.component';
import { ApartmentFormComponent } from 'app/modules/apartments/apartment-form/apartment-form.component';
import { ApartmentDetailsListComponent } from 'app/modules/apartments/apartment-details-list/apartment-details-list.component';
import { ResidentApartmentFormComponent } from 'app/modules/residents/resident-apartment-form/resident-apartment-form.component';
import { ResidentApartmentListComponent } from 'app/modules/residents/resident-apartment-list/resident-apartment-list';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,    
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,    
    GrdFilterPipe,
    NoDataComponent,
    LoadingInfoComponent,    
    CondominiumDetailsComponent,
    ApartmentListComponent,
    ApartmentDetailsComponent,    
    ResidentDetailsListComponent,
    ResidentApartmentFormComponent,
    ResidentListComponent,
    ResidentFormComponent,
    ApartmentFormComponent,
    ApartmentDetailsListComponent,
    ResidentApartmentListComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,    
    GrdFilterPipe,
    NoDataComponent,
    LoadingInfoComponent,
    CondominiumDetailsComponent,
    ApartmentListComponent,
    ApartmentDetailsComponent,    
    ResidentDetailsListComponent,
    ResidentApartmentFormComponent,
    ResidentListComponent,
    ResidentFormComponent,
    ResidentApartmentListComponent,
    ApartmentFormComponent,
    ApartmentDetailsListComponent
  ]
})
export class SharedModule { }
