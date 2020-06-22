import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
  OnInit,
} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { startWith } from 'rxjs/operators';

@Directive({
  selector: '[appRolesAllowed]',
})
export class RolesAllowedDirective implements OnInit {
  @Input() appRolesAllowed = [];
  hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.auth.observableStatusUser
      .pipe(startWith(''))
      .subscribe(() => this.validateUser());
  }

  validateUser() {
    const userLogged = this.auth.isAuthenticated;
    const rolesUser = this.auth.getRolesUser();
    const userWithRoleAllowed = this.hasUserAnyRoleAllowed(rolesUser);

    if (userLogged && userWithRoleAllowed && !this.hasView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if ((!userLogged || !userWithRoleAllowed) && this.hasView) {
      this.viewContainerRef.clear();
      this.hasView = false;
    }
  }

  hasUserAnyRoleAllowed(rolesUser) {
    let match = false;

    rolesUser.forEach((roleUser) => {
      if (this.appRolesAllowed.indexOf(roleUser) > -1) {
        match = true;
      }
    });

    return match;
  }
}
