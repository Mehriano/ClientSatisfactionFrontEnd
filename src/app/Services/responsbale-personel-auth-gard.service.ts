import { AuthGuard } from "./auth-guard.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ResponsablePersonelAuthGuard extends AuthGuard {
  canActivate() {
    let isAuthenticated = super.canActivate();
    if (!isAuthenticated) return false;

    if (this.authService.currentUser.role == "ResponsablePersonel") return true;

    this.router.navigate(["/error"]);
    return false;
  }
}
