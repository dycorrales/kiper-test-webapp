import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResidentRoutes } from './resident-routing';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { ResidentListComponent } from 'app/modules/residents/resident-list/resident-list.component';
import { SharedModule } from 'app/components/shared.module';
import { ResidentDetailsListComponent } from './resident-details-list/resident-details-list.component';
import { ApartmentDetailsComponent } from '../apartments/apartment-details/apartment-details.component';
import { ResidentFormComponent } from './resident-form/resident-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ResidentRoutes),
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    
]
})

export class ResidentModule {}
