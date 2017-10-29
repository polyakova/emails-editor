import { Component, ViewChild } from '@angular/core';
import { EmailsEditorComponent } from './lib/components/emails-editor/emails-editor.component';

@Component({
 selector: 'root',
 template: `
   <div id="main">
    <div class="container gray">
      <div class="title">Share "Board name" with others</div>
      <emails-editor></emails-editor>
    </div>
    <div class="buttons">
      <button class="btn btn-blue inline" (click)="addRandomEmail()">Add email</button>
      <button class="btn btn-blue" (click)="GetEmailsCount()">Get emails count</button>
    </div>
   </div>
   `
})

export class AppComponent {

  @ViewChild(EmailsEditorComponent)
  private emailsEditor: EmailsEditorComponent;
  
  private addRandomEmail() {
    this.emailsEditor.addRandomEmail();
  }

  private GetEmailsCount() {
    alert(this.emailsEditor.getEmailsCount());
  }
}