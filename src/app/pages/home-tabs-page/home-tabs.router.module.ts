import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeTabsPage } from './home-tabs-page.page';

const routes: Routes = [
  {
    path: 'hometabs',
    component: HomeTabsPage,
    children: [
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
      }, {
        path: 'order-details',
        loadChildren: '../order-details/order-details.module#OrderDetailsPageModule'
      }, {
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/hometabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeTabsPageRoutingModule { }
