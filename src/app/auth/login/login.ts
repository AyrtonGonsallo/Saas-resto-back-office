import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthSaasRestoService } from '../../shared/services/auth/auth-saas-resto.service';
import Swal from 'sweetalert2';
import { RestaurantService } from '../../shared/services/user/user.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public show: boolean = false;
  public loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor(private authSerivce:AuthSaasRestoService,private restaurantService:RestaurantService,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  showPassword() {
    this.show = !this.show;
  }

  // Simple Login
  login() {
  console.log(this.loginForm.value)
  this.authSerivce.login(this.loginForm.value).subscribe({
    next: (e) => {
      let user_connected = e.user
      console.log(e)
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: `Bienvenue ${user_connected.prenom} ${user_connected.nom}`,
        showConfirmButton: false,
      });

      let user_recupere = {
        email: user_connected.email,
        password: user_connected.mot_de_passe,
        name: user_connected.prenom+' '+user_connected.nom,
        datas:user_connected,
        accessToken:e.accessToken
      };

      localStorage.setItem('user', JSON.stringify(user_recupere));

      this.authSerivce.setUser(user_recupere);

     
      this.restaurantService.getStatsHome().subscribe(res => {
        console.log('this.stats',res)
      });
      
      this.router.navigate(['/dashboard/default']);
    },
    error: err => {
      console.error(err)
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: err.error.message,
        showConfirmButton: false,
      });
    }
  });
}


}
