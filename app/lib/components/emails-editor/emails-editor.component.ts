import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { EmailsService } from './emails.service';

@Component({
  moduleId: 'EmailsEditorModule',
  selector: 'emails-editor',
  template: `
  <div class="emails-editor">
    <div class="emails">
      <div *ngFor="let email of emails" class="email {{this.emailsService.isValidEmail(email) ? '' : 'invalid'}}">
        <span class="content">
          {{ email }}
        </span>
        <span class="remove" data-id={{email}} (click)="removeEmail($event)">&times;</span>
      </div>
     <form [formGroup]="emailForm">
        <input 
          type="text" 
          formControlName="emailInput"
          (keydown)="onKeydown($event)" 
          (paste)="onPaste($event)"
          (blur)="onBlur($event)"
          placeholder="add more people..." />
      </form>
    </div>
  </div>
  `,
  styles: [`
  .emails-editor form
  {
    display: inline;
  }
  .emails-editor input
  {
    border: none;
    outline: none;
    box-shadow: none;
    background: transparent;
  }
  .emails-editor .emails
  {
    border-top: 1px solid #CBCBCB;
    height: 100px;
    background-color: #fff;
    padding: 5px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .emails-editor .email
  {
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 4px;
    max-width: 100%;
    box-sizing: border-box;
    display: inline-flex;
    margin-bottom: 3px;
    height: 24px;
    line-height: 24px;
    background-color: rgba(102, 152, 255, 0.2);
    border-radius: 12px;
    font-size: 14px;
  }
  .emails-editor .email .content
  {
    max-width: calc(100% - 10px);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-right: 5px;
    font-size: small;
  }
  .emails-editor .email .remove
  {
    display: inline-block;
    width: 10px;
    height: 24px;
    opacity: 1;
    cursor: pointer;
    font-size: 1.05rem;
    line-height: 24px;
  }
  .emails-editor .email.invalid
  {
    background-color: transparent;
  }
  .emails-editor .email.invalid .content
  {
    border-bottom: 1px solid red;
  }
`] 
})

export class EmailsEditorComponent implements OnInit {

  public emailForm: FormGroup;
  private emails: string[] = [];
  private keys = {
    COMMA: 188,
    ENTER: 13,
    TAB: 9
  };

  constructor(private fb: FormBuilder, private emailsService: EmailsService) { }

  ngOnInit() {
    this.emailForm = this.fb.group({
      emailInput: ''
    });
  }

  public addRandomEmail() {
    this.addEmails([this.emailsService.generateEmail()]);
  };

  public getEmailsCount(): number {
    return this.emails.length;
  }
  
  private get emailInput(): AbstractControl {
    return this.emailForm.get('emailInput');
  }

  private get inputValue(): string {
    return this.emailInput.value;
  }

  private onKeydown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case this.keys.COMMA: case this.keys.ENTER: case this.keys.TAB:
        this.addEmails([this.inputValue]);
        event.preventDefault();
        break;
    }
  }

  private onPaste(event: any): void {
    let data = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
    let content = data.getData('text/plain');
    
    if (content != '') {
      var emails = this.emailsService.parseEmails(content);
      
      if (emails.length > 0)
        this.addEmails(emails);
      
      setTimeout(() => {
        this.resetInput();
      }, 100);  
    }
  }

  private onBlur(event: any): void {
    if (this.inputValue.trim() != '')
      this.addEmails([this.inputValue]);
  }

  private resetInput(): void {
    this.emailInput.setValue('');
  }

  private addEmails(emails: string[]): void {
    
    emails = emails.map(x => x.trim()).filter((x) => x != '');
    
    emails.forEach(email => {
      var e = this.emails.find((value, i) =>
        value.toLowerCase() == email.toLowerCase()
      );
    
      if (e == null)
        this.emails.push(email);
    });
    
    this.resetInput();
  }

  private removeEmail(event): void {
    this.emails = this.emails.filter(function (item: string) {
      return item !== event.target.id
    });
  }
}