import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from 'src/app/pipes/pipemodule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    TranslateModule.forChild(),
    PipeModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
