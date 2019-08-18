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
import { ResidentDetailsListComponent } from 'app/modules/residents/resident-details-list/resident-details-list.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthorizationCheck] },
    { path: 'condominiums', 
        children: [{
            path: '',
            loadChildren: '../../modules/condominiums/condominium.module#CondominiumModule'
        }] 
    },
    { path: 'residents', 
        children: [{
            path: '',
            loadChildren: '../../modules/residents/resident.module#ResidentModule'
        }]   
    },
    { path: 'apartments', 
        children: [{
            path: '',
            loadChildren: '../../modules/apartments/apartment.module#ApartmentModule'
        }]   
    }
];
