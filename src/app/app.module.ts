import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { QuillModule } from 'ngx-quill';

import { EditorModule, TINYMCE_SCRIPT_SRC  } from '@tinymce/tinymce-angular';

@NgModule({
  imports:      [ BrowserModule, FormsModule, EditorModule, QuillModule.forRoot() ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
