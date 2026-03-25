import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';

import { DescriptionCategoies } from './description-categoies/description-categoies';

@Component({
  selector: 'app-add-product',
  imports: [DropzoneModule, DescriptionCategoies, RouterModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {
  public Config: DropzoneConfigInterface = {
    clickable: true,
    url: 'https://httpbin.org/post',
    autoProcessQueue: false,
    addRemoveLinks: true,
    acceptedFiles: 'image/*',
    parallelUploads: 1,
  };

  public text =
    ' <div class="dz-message needsclick"><i class="icon-cloud-up"></i><p>Drop files here or click to upload.</p></div>';
}
