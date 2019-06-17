import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'no-wifi', loadChildren: './pages/no-wifi/no-wifi.module#NoWifiPageModule' },
  { path: 'splash', loadChildren: './pages/splash/splash.module#SplashPageModule' },
  { path: 'order-details', loadChildren: './pages/order-details/order-details.module#OrderDetailsPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'home-tabs-page', loadChildren: './pages/home-tabs-page/home-tabs-page.module#HomeTabsPageModule' },
  { path: 'filter-option', loadChildren: './modals/filter-option/filter-option.module#FilterOptionPageModule' },
  { path: 'car-detail', loadChildren: './pages/car-detail/car-detail.module#CarDetailPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
