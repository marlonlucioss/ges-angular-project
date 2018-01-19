import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { PageNotFoundComponent } from './exceptions/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
