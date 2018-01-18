import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { PageNotFoundComponent } from './exceptions/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardPageComponent },
  {
    path: '**',
    component: PageNotFoundComponent
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
