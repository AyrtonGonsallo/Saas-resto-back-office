import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivatedRoute, Router, } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuthSaasRestoService } from '../../../shared/services/auth/auth-saas-resto.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RestaurantService } from '../../../shared/services/user/user.service';
import { ClickOutsideDirective } from '../../../shared/directives/outside.directive';


@Component({
  selector: 'app-voir-notification',
  imports: [ReactiveFormsModule,CommonModule, ReactiveFormsModule, NgSelectModule, NgbModule,AngularEditorModule, ClickOutsideDirective],
  templateUrl: './voir-notification.html',
  styleUrl: './voir-notification.scss',
})
export class VoirNotification {
   custom_notifications:any[]=[]
  private router = inject(Router);
  restaurant_id:number|null
  formData!: FormGroup;
  user:any
    data_id=0
  constructor(private route: ActivatedRoute,private authSerivce:AuthSaasRestoService, private restaurantService:RestaurantService,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

    this.user = this.authSerivce.getUser();
      console.log('user recuperé',this.user )
      this.get_all_custom_notifications()
    this.restaurant_id = this.restaurantService.getRestaurant()
    console.log('this.restaurant_id',this.restaurant_id)
  

    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');

    this.user = this.authSerivce.getUser();
    console.log('user recuperé',this.user )

    this.load_data(this.data_id )
   
  }

 get_all_custom_notifications(){

    this.crudSaasService.getAllNotificationsByUserID(this.user?.datas.id).subscribe({
      next: (res) => {
        this.custom_notifications=res;
        console.log("custom_notifications",this.custom_notifications)
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération des notifications","Echec")
      }
    });
  }

  change() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }
   
    console.log(this.formData.value);
   
    this.crudSaasService.updateService(this.data_id,this.formData.value).subscribe({
      next: (res) => {
        Swal.fire({
              position: 'bottom-end',
              icon: 'success',
              title: 'L\'élément a bien été modifié',
              showConfirmButton: false,
            });
        setTimeout(() => {
          this.router.navigate(['/services/liste-services']);
        }, 2000);
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la modification","Echec")
      }
    });


    // appel API ici
  }

 


    
  
   data:any


  load_data(id:number){

    this.crudSaasService.getNotificationById(id).subscribe({
      next: (res) => {
        this.data=res
        console.log("this.data",this.data)

       

        
      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });

  }


   public MsgData = [];
    public isopen: boolean = false;
  
    open() {
      this.isopen = !this.isopen;
    }
  
    clickOutside(): void {
      this.isopen = false;
    }

    get_bg_class(statut:string){
      let res = ''
      switch (statut) {
        case 'non lue':
          res = 'right-msg'
          break;
        case 'lue':
          res = 'left-msg'
          break;
      
        default:
          break;
      }
      return res
    }
}