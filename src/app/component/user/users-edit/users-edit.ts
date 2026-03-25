import { Component } from '@angular/core';

import { AddProjectsUpload } from './add-projects-upload/add-projects-upload';
import { EditProfileForm } from './edit-profile-form/edit-profile-form';
import { MyProfile } from './my-profile/my-profile';

@Component({
  selector: 'app-users-edit',
  imports: [MyProfile, EditProfileForm, AddProjectsUpload],
  templateUrl: './users-edit.html',
  styleUrl: './users-edit.scss',
})
export class UsersEdit {}
