import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PropertyTypeComponent } from './pages/property-type/property-type.component';
import { SiteComponent } from './pages/site/site.component';
import { BookingComponent } from './pages/booking/booking.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'property-type',
                component: PropertyTypeComponent,
                title: 'Property Type'
            },
            {
                path: 'site-master',
                component: SiteComponent,
                title: 'Site Master'
            },
            {
                path: 'booking',
                component: BookingComponent,
                title: 'Booking'
            }
        ]
    }
];
