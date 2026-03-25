import { Component } from '@angular/core';

import { PersonalDetails } from './personal-details/personal-details';
import { UploadFiles } from './upload-files/upload-files';
import { YourEduction } from './your-eduction/your-eduction';
import { YourExprience } from './your-exprience/your-exprience';

@Component({
  selector: 'app-apply-form',
  imports: [PersonalDetails, UploadFiles, YourExprience, YourEduction],
  templateUrl: './apply-form.html',
  styleUrl: './apply-form.scss',
})
export class ApplyForm {}
