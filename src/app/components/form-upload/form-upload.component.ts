import { Component, OnInit, Input, Output, EventEmitter  } from "@angular/core";
import { UploadFileService } from "./upload-file.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";

@Component({
  selector: "form-upload",
  templateUrl: "./form-upload.component.html",
  styleUrls: ["./form-upload.component.css"]
})
export class FormUploadComponent implements OnInit {
  @Input() rota;

  @Input() empresa = "";
  @Input() parent = "";
  @Input() assets = "";
  @Input() fileName = "";

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  @Output() result = new EventEmitter();
  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {}

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService
      .pushFileToStorage(this.currentFileUpload, this.rota,this.parent, this.assets, this.empresa)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(
            100 * event.loaded / event.total
          );
        } else if (event instanceof HttpResponse) {
          this.progress.percentage = 0;
          this.result.emit(JSON.stringify(event.body));
        }
      });
    this.selectedFiles = undefined;
  }
}
