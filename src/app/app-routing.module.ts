import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/components/login/login.component';
import { authGuard } from './auth/auth.guard';
import { UserAssesmentCardsComponent } from './components/dashboard/user-assesment-cards/user-assesment-cards.component';
import { GraphComponent } from './components/dashboard/graph/graph.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'userassesments', pathMatch: 'full' },
      { path: 'userassesments/:id', component: GraphComponent },
      {
        path: 'userassesments',
        component: UserAssesmentCardsComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
