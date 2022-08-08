import { NgModule } from '@angular/core';
import { MATERIAL_MODULES } from './material-modules.const';

@NgModule({
  imports: [...MATERIAL_MODULES],
  exports: [...MATERIAL_MODULES],
})
export class SharedUiMaterialModule {}
