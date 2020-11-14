import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {NotificationService} from "../../services/notification.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    protected router: Router,
    protected authService: AuthService,
    private notificationService: NotificationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {

    if (this.authService.isLoggedIn()) {
      if (route.data.role == null) {
        return true;
      } else if (this.authService.currentUser.rol.includes(route.data.role)) {
        return true;
      } else {
        this.router.navigate(['/no-access']);
        return false;
      }
    }
    this.notificationService.error('E necessário estar logado para acessar este conteúdo!', 'Login');
    this.router.navigate(['/conta/login']);
    return false;
  }

  canActivateChangePassword(route: ActivatedRouteSnapshot) {
    if (this.authService.isLoggedIn()) {
      if (this.authService.currentUser.rol.includes(route.data.role)) {
        return true;
      } else {
        this.router.navigate(['/no-access']);
        return false;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
