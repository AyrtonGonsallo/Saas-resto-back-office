import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const rolesAutorises = route.data['roles'];

    if (rolesAutorises.includes(user.datas?.Role?.type)) {
      return true;
    }
     Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Accès interdit',
        showConfirmButton: false,
    });

    this.router.navigate(['/unauthorized']);
    return false;
  }
}