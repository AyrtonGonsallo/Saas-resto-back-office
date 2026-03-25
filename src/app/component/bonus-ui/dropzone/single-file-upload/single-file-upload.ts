import { Component } from '@angular/core';

import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-single-file-upload',
  imports: [DropzoneModule],
  templateUrl: './single-file-upload.html',
  styleUrl: './single-file-upload.scss',
})
export class SingleFileUpload {
  public Config: DropzoneConfigInterface = {
    url: 'https://httpbin.org/post',
    clickable: true,
    uploadMultiple: false,
    maxFiles: 1,
    addRemoveLinks: true,
  };
  public text =
    ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><p>Drop files here or click to upload.</p></div>';
}
