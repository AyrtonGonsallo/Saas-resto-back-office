import { Component } from '@angular/core';

import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-multi-file-upload',
  imports: [DropzoneModule],
  templateUrl: './multi-file-upload.html',
  styleUrl: './multi-file-upload.scss',
})
export class MultiFileUpload {
  public Config: DropzoneConfigInterface = {
    clickable: true,
    url: 'https://httpbin.org/post',
    uploadMultiple: true,
    addRemoveLinks: true,
  };
  public text =
    ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><p>Drop files here or click to upload.</p></div>';
}
