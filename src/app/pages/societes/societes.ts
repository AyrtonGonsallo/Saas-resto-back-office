import { Component } from '@angular/core';
import { userCard } from '../../shared/data/user/users-card';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-societes',
    imports: [RouterModule],
  templateUrl: './societes.html',
  styleUrl: './societes.scss',
})
export class Societes {
   public users = userCard;
}

