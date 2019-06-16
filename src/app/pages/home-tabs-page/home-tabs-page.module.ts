import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeTabsPage } from './home-tabs-page.page';
import { HomePageModule } from '../home/home.module';
import { HomeTabsPageRoutingModule } from './home-tabs.router.module';
import { SettingsPageModule } from '../settings/settings.module';
import { TranslateModule } from '@ngx-translate/core';
import { OrderDetailsPageModule } from '../order-details/order-details.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageModule,
    OrderDetailsPageModule,
    SettingsPageModule,
    HomeTabsPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [HomeTabsPage]
})
export class HomeTabsPageModule { }
