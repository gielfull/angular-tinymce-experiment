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
  public fieldValue = 'Write your letter here';
  public tinymceEditor;
  public tinyId;
  public contentText;
  public initObject = {
    init_instance_callback : function(editor) {
      this.tinymceEditor = editor;
      this.tinyId = editor.id;
      console.log("Editor: " + editor.id + " is now initialized.");
    },
    height: 300,
    menubar: false,
    plugins: [
       'fullscreen advlist autolink lists charmap print preview anchor',
       'searchreplace visualblocks code fullscreen wordcount',
       'image link media code'
     ],
    toolbar: "undo redo | formatselect | bold italic backcolor | \
      image | cbBusinessName | cbBusinessWebsite ",
    setup: (editor: any) => {
      editor.on('SetContent', (e: any) => this.tinySetContent());
      editor.on('Init', () => this.tinyInit());
      editor.ui.registry.addButton('cbBusinessName', {
        text: 'Business Name',
        onAction: () => {
          editor.insertContent('{{business_name}}');
        }
      });
      editor.ui.registry.addButton('cbBusinessWebsite', {
        text: 'Business WebSite',
        onAction: () => {
          editor.insertContent('{{business_web}}');
        }
      });
      editor.on('Change', (e, l) => {
		      console.log(editor.getContent());
          this.contentText = editor.getContent();
		  });
    },
     /* without images_upload_url set, Upload tab won't show up*/
    images_upload_url: '',

    /* we override default upload handler to simulate successful upload*/
    images_upload_handler: function (blobInfo, success, failure) {
      setTimeout(function () {
        /* no matter what you upload, we will turn it into TinyMCE logo :)*/
        success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
      }, 2000);
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

  public export() {
    // alert("Exported content");
    // alert(this.tinymceEditor.getContent({ format: "text" }));
    if(this.contentText === undefined){
      alert("You can't go to the nex step, before writting your letter first.");
    }else{
      console.log(this.contentText);
    }
  }
}