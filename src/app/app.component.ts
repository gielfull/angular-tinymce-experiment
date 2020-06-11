import { Component, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { EditorModule } from '@tinymce/tinymce-angular';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  constructor(private http: HttpClient) { }

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
    images_upload_credentials: true,
    images_upload_handler: function (blobInfo, success, failure) {
      var xhr, formData;
      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', 'https://api.imgur.com/3/upload');
      xhr.setRequestHeader('Authorization', 'Client-ID 120d729222bea41')
      xhr.onload = function() {
        var json;

        if (xhr.status != 200) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }
        json = JSON.parse(xhr.responseText);

        if (!json || typeof json.location != 'string') {
          failure('Invalid JSON: ' + xhr.responseText);
          return;
        }
        success(json.data.link);
      };
      formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());
      xhr.send(formData);
    }
  };

  // UploadImage(data: any) {
  //   let headers = new Headers();
  //   headers.append('Authorization', 'Client-ID 120d729222bea41');
  //   return this.http.post("https://api.imgur.com/3/upload", data, headers);
  // }

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
    if(this.contentText === undefined){
      alert("You can't go to the nex step, before writting your letter first.");
    }else{
      console.log(this.contentText);
    }
  }
}