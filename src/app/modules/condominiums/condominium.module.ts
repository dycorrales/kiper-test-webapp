import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CondominiumRoutes } from './condominium-routing';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';

import { CondominiumDetailsComponent } from 'app/modules/condominiums/condominium-details/condominium-details.component';
import { ApartmentListComponent } from 'app/modules/apartments/apartment-list/apartment-list.component';
import { ResidentListComponent } from 'app/modules/residents/resident-list/resident-list.component';
import { ApartmentDetailsComponent } from '../apartments/apartment-details/apartment-details.component';
import { SharedModule } from 'app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CondominiumRoutes),
    SharedModule
  ],
  declarations: [
  ]
})

export class CondominiumModule {}
