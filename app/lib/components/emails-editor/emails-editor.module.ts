import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailsEditorComponent } from './emails-editor.component';
import { EmailsService } from './emails.service';

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
  ],
  providers: [EmailsService]
})
export class EmailsEditorModule {}
