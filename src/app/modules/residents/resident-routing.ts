import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AuthorizationCheck } from 'app/security/auth-check.service';
import { CondominiumDetailsComponent } from 'app/modules/condominiums/condominium-details/condominium-details.component';
import { ApartmentDetailsComponent } from '../apartments/apartment-details/apartment-details.component';
import { ApartmentListComponent } from '../apartments/apartment-list/apartment-list.component';
import { ResidentDetailsListComponent } from './resident-details-list/resident-details-list.component';
import { ResidentFormComponent } from './resident-form/resident-form.component';

export const ResidentRoutes: Routes = [
  {
    path: '',
    component: ResidentDetailsListComponent,
    canActivate: [AuthorizationCheck]
  },
  {
    path: 'new',
    component: ResidentFormComponent,
    canActivate: [AuthorizationCheck]
  },
  {
    path: ':id',
    component: ResidentFormComponent,
    canActivate: [AuthorizationCheck]
  }
];
