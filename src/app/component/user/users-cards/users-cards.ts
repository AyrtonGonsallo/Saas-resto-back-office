import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { userCard } from '../../../shared/data/user/users-card';

@Component({
  selector: 'app-users-cards',
  imports: [RouterModule],
  templateUrl: './users-cards.html',
  styleUrl: './users-cards.scss',
})
export class UsersCards {
  public users = userCard;
}
