import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthSaasRestoService } from '../../../../shared/services/auth/auth-saas-resto.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword {

  part1 = 0
  part2 = 0
  part3 = 0
  can_check_code = false
  can_enter_new_password = false
  email = ""
  new_password = ""
  confirmed_new_password = ""
  public show: boolean = false;

  showPassword() {
    this.show = !this.show;
  }

  constructor(private authSerivce:AuthSaasRestoService) {
    
  }

  get_code(){

    let data ={
      email:this.email
    }

    console.log(data)
      this.authSerivce.get_change_password_code(data).subscribe({
        next: (e) => {
          
          console.log(e)
        
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: `Code envoyé`,
            showConfirmButton: false,
          });
    
          this.can_check_code=true
          
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

  check_code(){
    let code = `${this.part1}${this.part2}${this.part3}`
    let data ={
      email:this.email,
      code:code
    }

    this.authSerivce.check_change_password_code(data).subscribe({
        next: (e) => {
          
          console.log(e)
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: `Code vérifié`,
            showConfirmButton: false,
          });
            this.can_enter_new_password=true
          console.log('can_enter_new_password', this.can_enter_new_password)
    
         
          
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

  change_password(){

    let data ={
      email:this.email,
      mot_de_passe:this.new_password
    }

    this.authSerivce.resset_password(data).subscribe({
        next: (e) => {
          
          console.log(e)
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: `Mot de passe changé`,
            showConfirmButton: false,
          });
          this.can_enter_new_password=false
    
         
          
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


    checkpasswords(){
      const val1 = this.new_password;
      const val2 = this.confirmed_new_password;
      if(val1==''){
        return false
      }

      return val1 === val2;
    }


}
