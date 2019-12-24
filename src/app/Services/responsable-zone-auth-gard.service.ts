import { AuthGuard } from "./auth-guard.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ResponsableZoneAuthGuard extends AuthGuard {
  canActivate() {
    let isAuthenticated = super.canActivate();
    if (!isAuthenticated) return false;

    if (this.authService.currentUser.role == "ResponsableZone") return true;

    this.router.navigate(["/error"]);
    return false;
  }
}
