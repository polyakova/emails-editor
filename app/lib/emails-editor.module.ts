import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailsEditorComponent } from './components/emails-editor.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    EmailsEditorComponent
  ],
  exports: [
    EmailsEditorComponent
  ]
})
export class EmailsEditorModule {}
