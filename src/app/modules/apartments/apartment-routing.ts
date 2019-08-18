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
import { ApartmentDetailsComponent } from './apartment-details/apartment-details.component';
import { ApartmentListComponent } from './apartment-list/apartment-list.component';
import { ApartmentFormComponent } from './apartment-form/apartment-form.component';
import { ApartmentDetailsListComponent } from './apartment-details-list/apartment-details-list.component';

export const ApartmentRoutes: Routes = [
  {
    path: '',
    component: ApartmentDetailsListComponent,
    canActivate: [AuthorizationCheck]
  },
  {
    path: 'new',
    component: ApartmentFormComponent,
    canActivate: [AuthorizationCheck]
  },
  {
    path: ':id',
    component: ApartmentFormComponent,
    canActivate: [AuthorizationCheck]
  }
];
