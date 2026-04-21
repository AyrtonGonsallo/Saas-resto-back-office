import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudSaasRestoService } from '../../../shared/services/api/crud-saas-resto.service';
import { NotificationsService } from '../../../shared/services/notifications/notifications.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../../../shared/services/user/user.service';
import { environment } from '../../../environment';

@Component({
  selector: 'app-modifier-restaurant',
  imports: [ReactiveFormsModule,CommonModule,ReactiveFormsModule, NgSelectModule, NgbModule,   ],
  templateUrl: './modifier-restaurant.html',
  styleUrl: './modifier-restaurant.scss',
})
export class ModifierRestaurant {
  
  private router = inject(Router);
  public imagesUrl = environment.imagesUrl
  formData!: FormGroup;
  user:any;
  constructor(private route: ActivatedRoute,private fb: FormBuilder, private restaurantService: RestaurantService, private crudSaasService:CrudSaasRestoService, private notificationsService:NotificationsService,) {}

  data_id=0


  ngOnInit(): void {

    this.data_id = parseInt(this.route.snapshot.paramMap.get('id')??'');
     this.load_data(this.data_id )

    this.get_all_utilisateurs()

    this.get_all_societes()
    
    this.formData = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      coordonnees_google_maps: ['', ],
      image: ['', ],
      heure_debut: ['', [Validators.required, ]],
      heure_fin: ['', [Validators.required, ]],
      heure_cc_debut: ['', [, ]],
      heure_cc_fin: ['', [, ]],
      telephone: ['', [Validators.pattern(/^[0-9+\s\-()]{8,20}$/)]],
      societe_id: [0, Validators.required],
      utilisateur_id: [0, Validators.required],
    });
  }


  verifier_roles_et_societes(user: any, currentRestaurant: any) {
    console.log('user', user);
    console.log('restaurant', currentRestaurant);

    const prioriteRoleUser = user?.datas?.Role?.priorite;
    const societeUser = user?.datas?.societe_id;

    const societeRestaurant = currentRestaurant?.societe_id;
    const restaurantId = currentRestaurant?.id;

    const restaurantsAutorises =
      user?.datas?.Restaurants?.map((r: any) => r.id) || [];

    // super admin
    if (prioriteRoleUser === 1) return;

    // autre société
    if (societeUser !== societeRestaurant) {
      this.notificationsService.error(
        "Vous ne pouvez pas modifier un restaurant d'une autre société",
        "Echec"
      );
      this.router.navigate(['/dashboard/default']);
      return;
    }

    // gestionnaire restaurant → seulement ses restos
    if (prioriteRoleUser === 4) {
      const canAccess = restaurantsAutorises.includes(restaurantId);

      if (!canAccess) {
        this.notificationsService.error(
          "Vous ne pouvez pas modifier ce restaurant",
          "Echec"
        );
        this.router.navigate(['/dashboard/default']);
        return;
      }
    }

    if (prioriteRoleUser >= 5) {
    this.notificationsService.error(
      "Vous n'avez pas les permissions nécessaires",
      "Echec"
    );
    this.router.navigate(['/dashboard/default']);
    return;
  }
  }
 

  onSubmit() {
    
    if (this.formData.invalid) {
      this.notificationsService.error("Formulaire invalide","Echec")
      this.formData.markAllAsTouched();
      return;
    }

    const finalFormData = new FormData();

    finalFormData.append('nom', this.formData.value.nom);
    finalFormData.append('adresse', this.formData.value.adresse);
    finalFormData.append('ville', this.formData.value.ville);
    finalFormData.append('coordonnees_google_maps', this.formData.value.coordonnees_google_maps);
    finalFormData.append('heure_debut', this.formData.value.heure_debut);
    finalFormData.append('heure_fin', this.formData.value.heure_fin);
    finalFormData.append('heure_cc_debut', this.formData.value.heure_cc_debut);
    finalFormData.append('heure_cc_fin', this.formData.value.heure_cc_fin);
    finalFormData.append('telephone', this.formData.value.telephone);
    finalFormData.append('societe_id', this.formData.value.societe_id);

    //  fichier image
    if (this.selectedFile) {
      console.log("image envoyee",this.selectedFile)
      finalFormData.append('image', this.selectedFile);
    }

    console.log('finalFormData',finalFormData);

     this.crudSaasService.updateRestaurant(this.data_id,finalFormData).subscribe({
          next: (res) => {
            Swal.fire({
                  position: 'bottom-end',
                  icon: 'success',
                  title: 'L\'élément a bien été modifié',
                  showConfirmButton: false,
                });
            setTimeout(() => {
              this.router.navigate(['/restaurants/liste-restaurants']);
            }, 2000);
          },
          error: (err) => {
            this.notificationsService.error("Erreur lors de la modification","Echec")
          }
        });


    // appel API ici
  }

  gestionnaires:any[]
  allGestionnaires:any[]
  societes:any[]


    get_all_societes(){
      this.crudSaasService.getSocietes().subscribe({
        next: (res) => {
          this.societes=res
          console.log("societes",this.societes)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des sociétés","Echec")
        }
      });
    }


    get_all_utilisateurs(){
      let restaurant_id = this.restaurantService.getRestaurant()
      this.crudSaasService.getUtilisateursByRole('gestionnaire-restaurant',restaurant_id).subscribe({
        next: (res) => {
          this.gestionnaires = res.map(g => ({
            ...g,
            fullName: g.prenom + ' ' + g.nom + ' (' + g.Societe.titre + ')'
          }));
          this.allGestionnaires = res.map(g => ({
            ...g,
            fullName: g.prenom + ' ' + g.nom + ' (' + g.Societe.titre + ')'
          }));
          console.log("utilisateurs",this.gestionnaires)
        },
        error: (err) => {
          this.notificationsService.error("Erreur lors de la récupération des utilisateurs","Echec")
        }
      });
    }

    get_heures(){
      let res= Array.from({ length: 24 }, (_, i) => {
        const heure = i.toString().padStart(2, '0') + ':00';
        return {
          position: i + 1,
          label: heure
        };
      });
      return res
    }


    heures_deb = this.get_heures()

    heures_fin = this.get_heures()

    heures_cc_deb = this.get_heures()

    heures_cc_fin = this.get_heures()


    
   data:any


    load_data(id:number){

      this.crudSaasService.getRestaurantById(id).subscribe({
      next: (res) => {
        this.data=res
        const user = this.restaurantService.getUser();
        this.verifier_roles_et_societes(user, this.data);
      
         this.formData = this.fb.group({
          nom: [this.data.nom, Validators.required],
          adresse: [this.data.adresse, Validators.required],
          ville: [this.data.ville, Validators.required],
          coordonnees_google_maps: [this.data.coordonnees_google_maps, ],
          image: ['', ],
          heure_debut: [this.data.heure_debut, [Validators.required, ]],
          heure_fin: [this.data.heure_fin, [Validators.required, ]],
          heure_cc_debut: [this.data.heure_cc_debut, [, ]],
          heure_cc_fin: [this.data.heure_cc_fin, [, ]],
          telephone: [this.data.telephone, [Validators.pattern(/^[0-9+\s\-()]{8,20}$/)]],
          societe_id: [this.data.societe_id, Validators.required],
          utilisateur_id: [this.data.utilisateur_id, Validators.required],
        });

        this.formData.get('societe_id')?.valueChanges.subscribe((societe_id) => {

          console.log("societe_id choisi:", societe_id);

          if (!societe_id) {
            this.gestionnaires = this.allGestionnaires;
          } else {
            this.gestionnaires = this.allGestionnaires.filter(cat =>
              cat.societe_id === societe_id
            );
          }

          // 🔥 reset catégorie sélectionnée
          this.formData.patchValue({ utilisateur_id: null });

        });
        
      },
      error: (err) => {
        if (err.status === 404) {
        this.notificationsService.error("Restaurant introuvable", "Echec");
      } else if (err.status === 400) {
        this.notificationsService.error("ID restaurant invalide", "Echec");
      } else {
        this.notificationsService.error("Erreur lors de la récupération", "Echec");
      }
      this.router.navigate(['restaurants/liste-restaurants']);
      }
    });

    }


    
  previewUrl : any = null;
  selectedFile: File | null = null;
  maxSize = 2 * 1024 * 1024;
  onFileSelected(event: any) {
    
    this.selectedFile = event.target.files[0];
    let filesize = this.selectedFile?.size??0
    if (filesize > this.maxSize) {
      alert('Fichier trop volumineux (max 2MB)');
      return;
    }
    console.log("upload",this.selectedFile)
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  isZoomed = false;

  openZoom() {
    this.isZoomed = true;
  }

  closeZoom() {
    this.isZoomed = false;
  }


}
