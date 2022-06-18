import { RouterModule, Routes } from '@angular/router';
import { ForwarderComponent } from './pages/forwarder/forwarder.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'r/:id',
    component: ForwarderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
