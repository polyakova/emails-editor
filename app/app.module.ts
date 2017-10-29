import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { EmailsEditorModule }  from './lib/emails-editor.module';

@NgModule({
  imports:      [ BrowserModule, EmailsEditorModule ],
  declarations: [ 
    AppComponent
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }