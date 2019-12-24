import { ZoneAddComponent } from "./pages/zone/zone-add/zone-add.component";
import { ZoneEditComponent } from "./pages/zone/zone-edit/zone-edit.component";
import { ZonesComponent } from "./pages/zone/zones/zones.component";
import { HomePageClientComponent } from "./home-page-client/home-page-client.component";
import { HomeTemplateComponent } from "./pages/home-template/home-template.component";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { PagesComponent } from "./pages/pages.component";
import { NotFoundComponent } from "./pages/errors/not-found/not-found.component";
import { ErrorComponent } from "./pages/errors/error/error.component";
import { VillesComponent } from "./pages/ville/villes/villes.component";
import { VilleAddComponent } from "./pages/ville/ville-add/ville-add.component";
import { villeEditComponent } from "./pages/ville/ville-edit/ville-edit.component";
import { BoutiquesComponent } from "./pages/boutique/boutiques/boutiques.component";
import { BoutiqueAddComponent } from "./pages/boutique/boutique-add/boutique-add.component";
import { BoutiqueEditComponent } from "./pages/boutique/boutique-edit/boutique-edit.component";
import { AuthGuard } from "./Services/auth-guard.service";
import { AdminAuthGuard } from "./Services/admin-auth-gard.service";
import { QuestionnairesComponent } from "./pages/questionnaire/questionnaires/questionnaires.component";
import { QuestionnaireAddComponent } from "./pages/questionnaire/questionnaire-add/questionnaire-add.component";
import { SubmitNumFactureComponent } from "./pages/submit-num-facture/submit-num-facture.component";
import { ReponseQuestionnaireComponent } from "./pages/reponse-questionnaire/reponse-questionnaire.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeTemplateComponent,
    children: [
      { path: "", component: HomePageClientComponent, pathMatch: "full" },
      {
        path: "login",
        loadChildren: "./pages/login/login.module#LoginModule",
        pathMatch: "full"
      },
      {
        path: "register",
        loadChildren: "./pages/register/register.module#RegisterModule",
        pathMatch: "full"
      },
      {
        path: "survey",
        component: SubmitNumFactureComponent
      },
      {
        path: "repQuestionnaire/:id/:numFacture",
        component: ReponseQuestionnaireComponent
      }
    ]
  },
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dash",
        loadChildren: "./pages/dashboard/dashboard.module#DashboardModule",
        data: { breadcrumb: "Dashboard" },
        canActivate: [AuthGuard]
      },
      {
        path: "users",
        loadChildren: "./pages/users/users.module#UsersModule",
        data: { breadcrumb: "Users" }
      },

      //************zone***************/

      {
        path: "zones",
        component: ZonesComponent,
        data: { breadcrumb: "Zones" },
        canActivate: [AuthGuard]
      },
      {
        path: "zoneAdd",
        component: ZoneAddComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: "Zone-edit/:id",
        component: ZoneEditComponent,
        data: { breadcrumb: "Zo" },
        canActivate: [AuthGuard, AdminAuthGuard]
      },

      //************ville****************//

      {
        path: "villes",
        component: VillesComponent,
        data: { breadcrumb: "Villes" },
        canActivate: [AuthGuard]
      },
      {
        path: "villeAdd",
        component: VilleAddComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: "ville-edit/:id",
        component: villeEditComponent,
        data: { breadcrumb: "ville" },
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      /* Boutique */

      {
        path: "boutiques",
        component: BoutiquesComponent,
        data: { breadcrumb: "boutiques" },
        canActivate: [AuthGuard]
      },
      {
        path: "boutiqueAdd",
        component: BoutiqueAddComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: "boutique-edit/:id",
        component: BoutiqueEditComponent,
        data: { breadcrumb: "boutique" },
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      //-----------------------------------------------------

      {
        path: "questionnaires",
        component: QuestionnairesComponent,
        data: { breadcrumb: "questionnaires" },
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: "questionnaireAdd",
        component: QuestionnaireAddComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: "questionnaire-edit/:id",
        component: BoutiqueEditComponent,
        data: { breadcrumb: "boutique" },
        canActivate: [AuthGuard, AdminAuthGuard]
      }
    ]
  },
  {
    path: "landing",
    loadChildren: "./pages/landing/landing.module#LandingModule"
  },
  { path: "error", component: ErrorComponent, data: { breadcrumb: "Error" } },

  { path: "**", component: NotFoundComponent, pathMatch: "full" }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules // <- comment this line for activate lazy load
  // useHash: true
});
