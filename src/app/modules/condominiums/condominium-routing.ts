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
import { ApartmentFormComponent } from '../apartments/apartment-form/apartment-form.component';

export const CondominiumRoutes: Routes = [
  {
    path: ':id', component: CondominiumDetailsComponent,
    canActivate: [AuthorizationCheck],
    children: [
      {
        path: '',
        component: ApartmentListComponent,
        canActivate: [AuthorizationCheck]
      },
      {
        path: 'apartments/:apartmentId',
        component: ApartmentDetailsComponent,
        canActivate: [AuthorizationCheck]
      },
      {
        path: 'apartments/new',
        component: ApartmentFormComponent,
        canActivate: [AuthorizationCheck]
      },
      {
        path: 'apartments/:id',
        component: ApartmentFormComponent,
        canActivate: [AuthorizationCheck]
      }
    ]
  }
];
