import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TenebrisPlayerComponent } from './tenebris-player/tenebris-player.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'player', component: TenebrisPlayerComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
