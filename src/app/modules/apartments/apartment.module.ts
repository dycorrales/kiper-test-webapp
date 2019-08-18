import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { ApartmentDetailsComponent } from './apartment-details/apartment-details.component';
import { ApartmentRoutes } from './apartment-routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ApartmentRoutes),
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    
]
})

export class ApartmentModule {}
