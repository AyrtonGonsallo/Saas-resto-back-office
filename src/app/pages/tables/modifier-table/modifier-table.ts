import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modifier-table',
  imports: [ReactiveFormsModule,CommonModule,ReactiveFormsModule, NgSelectModule, NgbModule,   ],
  templateUrl: './modifier-table.html',
  styleUrl: './modifier-table.scss',
})
export class ModifierTable {
  
  private router = inject(Router);
  formData!: FormGroup;
  data_id=0
  constructor(private route: ActivatedRoute,private fb: FormBuilder, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  ngOnInit(): void {

     this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
     this.load_data(this.data_id )

     this.get_all_restaurants()

    this.get_all_societes()
    
    this.formData = this.fb.group({
      numero: ['', Validators.required],
      nb_places: [1, ],
      statut: ['libre', Validators.required],
      societe_id: [0, [Validators.required, ]],
      restaurant_id: [0, [Validators.required, ]],
    });
  }

  statuts = [
    { key: 'occupée', name: 'Occupée' },
    { key: 'libre', name: 'Libre' },
  ];

  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }

   

    console.log(this.formData.value);

     this.crudSaasService.updateTable(this.data_id,this.formData.value).subscribe({
          next: (res) => {
            Swal.fire({
                  position: 'bottom-end',
                  icon: 'success',
                  title: 'L\'élément a bien été modifié',
                  showConfirmButton: false,
                });
            setTimeout(() => {
              this.router.navigate(['/tables/liste-tables']);
            }, 2000);
          },
          error: (err) => {
            this.notificationsService.error("Erreur lors de la modification","Echec")
          }
        });


    // appel API ici
  }

restaurants:any[]
societes:any[]

  get_all_restaurants(){
      this.crudSaasService.getRestaurants().subscribe({
        next: (res) => {
          this.restaurants=res
          console.log("getRestaurants",this.restaurants)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des restaurants","Echec")
        }
      });
  }

    get_all_societes(){
      this.crudSaasService.getSocietes().subscribe({
        next: (res) => {
          this.societes=res
          console.log("getSocietes",this.societes)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des sociétés","Echec")
        }
      });
    }

    
   data:any


    load_data(id:number){

      this.crudSaasService.getTableById(id).subscribe({
      next: (res) => {
        this.data=res

        this.formData = this.fb.group({
          numero: [this.data.numero, Validators.required],
          nb_places: [this.data.nb_places, ],
          statut: [this.data.statut, Validators.required],
          societe_id: [this.data.societe_id, [Validators.required, ]],
          restaurant_id: [this.data.restaurant_id, [Validators.required, ]],
        });

      },
      error: (err) => {
        this.notificationsService.error("Erreur lors de la récupération","Echec")
      }
    });

    }


}
