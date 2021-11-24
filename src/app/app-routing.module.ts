import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartScreenComponent} from './start-screen/start-screen.component';
import {SettingsCurrencyComponent} from './settings-currency/settings-currency.component';

const routes: Routes = [
  {path: '', redirectTo: '/startScreen', pathMatch: 'full'},
  {path: 'startScreen', component: StartScreenComponent},
  {path: 'settingsCurrency', component: SettingsCurrencyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
