import { Component, VERSION } from '@angular/core';
import * as Quill from 'ngx-quill';
import { EditorModule } from '@tinymce/tinymce-angular';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  public apiKey = "";
  public fieldValue = 'some value';
  public initObject = {
    height: 500,
    toolbar: "undo redo | formatselect | bold italic backcolor | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | removeformat | myCustomToolbarButton ",
    setup: (editor: any) => {
      editor.on('SetContent', (e: any) => this.tinySetContent());
      editor.on('Init', () => this.tinyInit());
      editor.ui.registry.addButton('myCustomToolbarButton', {
      text: 'My Custom Button',
      onAction: () => {
        editor.insertContent('&nbsp;<strong>It\'s my button!</strong>&nbsp;');
      }
    });
    }
  };

  public tinySetContent() {
    console.log('set by tiny');
  }

  public angularSetContent() {
    console.log('set by angular');
  }

  public tinyInit() {
    console.log('init by tiny');
  }

  public angularInit() {
    console.log('init by angular');
  }
}