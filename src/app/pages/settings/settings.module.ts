import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicAngularThemeSwitchSelectModule } from 'ionic-angular-theme-switch';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    IonicAngularThemeSwitchSelectModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule { }
