import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogeadoPage } from './logeado.page';

const routes: Routes = [
  {
    path: '',
    component: LogeadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogeadoPageRoutingModule {}
