import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Keys } from '../shared/keys';

declare var module: {
  id: string;
}

@Component({
  moduleId: 'EmailsEditorModule',
  selector: 'emails-editor',
  template: `
  <div class="emails-editor">
    <div class="emails">
      <div *ngFor="let email of emails" class="email {{this.isValid(email) ? '' : 'invalid'}}">
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

  constructor(private fb: FormBuilder) {
    this.emails.push("e@polyakova.net");
  }

  ngOnInit() {
    this.emailForm = this.fb.group({
      emailInput: ''
    });
  }

  public addRandomEmail() {
    this.addEmails([this.GenerateRandomEmail()]);
  };

  public getEmailsCount(): number {
    return this.emails.length;
  }

  private GenerateRandomEmail(): string {
    var length = Math.random() * 10;
    var email = "";
    var domain = "";
    var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    var domains = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < length; i++)
      email += chars.charAt(Math.floor(Math.random() * chars.length));

    for (var i = 0; i < length; i++)
      domain += domains.charAt(Math.floor(Math.random() * chars.length));

    return email + "@" + domain + ".com";
  }

  private get emailInput(): AbstractControl {
    return this.emailForm.get('emailInput');
  }

  private get inputValue(): string {
    return this.emailInput.value;
  }

  private onKeydown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case Keys.COMMA: case Keys.ENTER: case Keys.TAB:
        this.addEmails([this.inputValue]);
        event.preventDefault();
        break;
    }
  }

  private onPaste(event: any): void {
    let data = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
    let content = data.getData('text/plain');
    
    if (content != '') {
      var emails = this.parseEmails(content);
      
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

  private isValid(email: string) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  private parseEmails(content: string): string[] {
    return content.trim().split(',').filter((x) => !!x);
  }

  private addEmails(emails: string[]): void {
    emails = emails.map(x => x.trim()).filter((x) => x != '');
    this.emails = this.emails.concat(emails).filter((x, i, array) => array.indexOf(x) === i);
    this.resetInput();
  }

  private removeEmail(event): void {
    this.emails = this.emails.filter(function (item: string) {
      return item !== event.target.id
    });
  }
}