import { QuestionnaireService } from "src/app/Services/questionnaire.service";
import { VilleAddComponent } from "./pages/ville/ville-add/ville-add.component";
import { TokenInterceptor } from "./token-interceptor";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpModule } from "@angular/http";

import { ZoneService } from "./Services/zone.service";
import { UserService } from "./Services/user.service";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule, FormArray } from "@angular/forms";
import { OverlayContainer } from "@angular/cdk/overlay";
import { CustomOverlayContainer } from "./theme/utils/custom-overlay-container";

import { AgmCoreModule } from "@agm/core";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};

import { CalendarModule } from "angular-calendar";
import { SharedModule } from "./shared/shared.module";
import { PipesModule } from "./theme/pipes/pipes.module";
import { routing } from "./app.routing";

import { AppSettings } from "./app.settings";
import { AppComponent } from "./app.component";
import { PagesComponent } from "./pages/pages.component";
import { BlankComponent } from "./pages/blank/blank.component";
import { SearchComponent } from "./pages/search/search.component";
import { NotFoundComponent } from "./pages/errors/not-found/not-found.component";
import { ErrorComponent } from "./pages/errors/error/error.component";
import { HomeTemplateComponent } from "./pages/home-template/home-template.component";
import { HomePageClientComponent } from "./home-page-client/home-page-client.component";
import { ZoneEditComponent } from "./pages/zone/zone-edit/zone-edit.component";
import { ZoneAddComponent } from "./pages/zone/zone-add/zone-add.component";
import { ZonesComponent } from "./pages/zone/zones/zones.component";
import { VillesComponent } from "./pages/ville/villes/villes.component";

import { TopInfoContentComponent } from "./theme/components/top-info-content/top-info-content.component";
import { SidenavComponent } from "./theme/components/sidenav/sidenav.component";
import { VerticalMenuComponent } from "./theme/components/menu/vertical-menu/vertical-menu.component";
import { HorizontalMenuComponent } from "./theme/components/menu/horizontal-menu/horizontal-menu.component";
import { FlagsMenuComponent } from "./theme/components/flags-menu/flags-menu.component";
import { FullScreenComponent } from "./theme/components/fullscreen/fullscreen.component";
import { ApplicationsComponent } from "./theme/components/applications/applications.component";
import { MessagesComponent } from "./theme/components/messages/messages.component";
import { UserMenuComponent } from "./theme/components/user-menu/user-menu.component";
import { FavoritesComponent } from "./theme/components/favorites/favorites.component";
import { VilleService } from "./Services/ville.service";

import { MatSelectModule } from "@angular/material/select";
import { DialogDeleteItemDialog } from "./shared/dialog-delete/dialog-delete-item-dialog";
import { villeEditComponent } from "./pages/ville/ville-edit/ville-edit.component";
import { BoutiqueAddComponent } from "./pages/boutique/boutique-add/boutique-add.component";
import { BoutiquesComponent } from "./pages/boutique/boutiques/boutiques.component";
import { BoutiqueEditComponent } from "./pages/boutique/boutique-edit/boutique-edit.component";
import { AuthGuard } from "./Services/auth-guard.service";
import { AdminAuthGuard } from "./Services/admin-auth-gard.service";
import { QuestionnairesComponent } from "./pages/questionnaire/questionnaires/questionnaires.component";
import { QuestionnaireAddComponent } from "./pages/questionnaire/questionnaire-add/questionnaire-add.component";
import { AutocompleteComponent } from "./pages/form-controls/autocomplete/autocomplete.component";
import { CheckboxComponent } from "./pages/form-controls/checkbox/checkbox.component";
import { DatepickerComponent } from "./pages/form-controls/datepicker/datepicker.component";
import { FormFieldComponent } from "./pages/form-controls/form-field/form-field.component";
import { InputComponent } from "./pages/form-controls/input/input.component";
import { RadioButtonComponent } from "./pages/form-controls/radio-button/radio-button.component";
import { SelectComponent } from "./pages/form-controls/select/select.component";
import { SubmitNumFactureComponent } from "./pages/submit-num-facture/submit-num-facture.component";
import { ReponseQuestionnaireComponent } from "./pages/reponse-questionnaire/reponse-questionnaire.component";
import { ReponseService } from "./Services/reponse.service";
import { MatInputModule } from "@angular/material";
@NgModule({
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBNcjxo_35qnEG17dQvvftWa68eZWepYE0"
    }),
    PerfectScrollbarModule,
    CalendarModule.forRoot(),
    SharedModule,
    PipesModule,
    routing
  ],
  declarations: [
    AutocompleteComponent,
    CheckboxComponent,
    DatepickerComponent,
    FormFieldComponent,
    InputComponent,
    RadioButtonComponent,
    SelectComponent,

    DialogDeleteItemDialog,
    AppComponent,
    PagesComponent,
    BlankComponent,
    SearchComponent,
    NotFoundComponent,
    ErrorComponent,
    TopInfoContentComponent,
    SidenavComponent,
    VerticalMenuComponent,
    HorizontalMenuComponent,
    FlagsMenuComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent,
    FavoritesComponent,
    HomeTemplateComponent,
    HomePageClientComponent,
    ZonesComponent,
    ZoneEditComponent,
    ZoneAddComponent,
    VillesComponent,
    villeEditComponent,
    VilleAddComponent,
    BoutiquesComponent,
    BoutiqueAddComponent,
    BoutiqueEditComponent,
    QuestionnairesComponent,
    QuestionnaireAddComponent,
    SubmitNumFactureComponent,
    ReponseQuestionnaireComponent
  ],
  providers: [
    AppSettings,
    UserService,
    ZoneService,
    VilleService,
    QuestionnaireService,
    ReponseService,
    AuthGuard,
    AdminAuthGuard,

    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [DialogDeleteItemDialog],
  bootstrap: [AppComponent]
})
export class AppModule {}
