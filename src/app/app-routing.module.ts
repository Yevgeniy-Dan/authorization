import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { UserAssesmentCardsComponent } from './components/dashboard/user-assesment-cards/user-assesment-cards.component';
import { GraphComponent } from './components/dashboard/graph/graph.component';
import { UserTableComponent } from './components/dashboard/user-table/user-table.component';
import { AdminGuard } from './auth/guards/admin.guard';
import {
  dashboardPath,
  loginPath,
  userassesmentsPath,
  usersPath,
} from './constants/routes';

const routes: Routes = [
  { path: '', redirectTo: dashboardPath, pathMatch: 'full' },
  {
    path: loginPath,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: dashboardPath,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'userassesments', pathMatch: 'full' },
      { path: `${userassesmentsPath}/:id`, component: GraphComponent },
      {
        path: userassesmentsPath,
        component: UserAssesmentCardsComponent,
      },
      {
        path: usersPath,
        component: UserTableComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  { path: '**', redirectTo: dashboardPath },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
