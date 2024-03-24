import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserComponent } from './pages/user/user.component';
import { NewUserComponent } from './pages/user/new-user/new-user.component';
import { ServiceComponent } from './pages/service/service.component';
import { DivisionComponent } from './pages/division/division.component';
import { HistoriqueComponent } from './pages/historique/historique.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'PB', canActivate: [AuthGuardService], children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'user', component: UserComponent},
        {path: 'new_user', component: NewUserComponent},
        {path: 'service', component: ServiceComponent},
        {path: 'division', component: DivisionComponent},
        {path: 'historique', component: HistoriqueComponent},
    ]},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '**', component: ErrorPageComponent}
];
