import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogeadoPageRoutingModule } from './logeado-routing.module';

import { LogeadoPage } from './logeado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogeadoPageRoutingModule
  ],
  declarations: [LogeadoPage]
})
export class LogeadoPageModule {}
