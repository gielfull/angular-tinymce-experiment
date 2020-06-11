import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { HttpClientModule } from '@angular/common/http';

import { EditorModule, TINYMCE_SCRIPT_SRC  } from '@tinymce/tinymce-angular';

@NgModule({
  imports:      [ BrowserModule, FormsModule, EditorModule, HttpClientModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
