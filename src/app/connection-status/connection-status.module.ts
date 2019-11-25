import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TryAgainComponent} from './components/try-again/try-again.component';


const COMPONENTS = [
  TryAgainComponent,
];

const BASE_MODULES = [
  CommonModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    ...BASE_MODULES,
  ],
  exports: [
    ...COMPONENTS,
    ...BASE_MODULES,
  ],
})
export class ConnectionStatusModule { }
