import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { MenuService, Menu } from '../../../services/menu.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() menu;
  @ViewChild('photoUser') photoUser: ElementRef;
  elementsMenu: Menu[];
  nameUser = '';
  photoUrlUser = '';

  constructor(
    private menuService: MenuService,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.elementsMenu = this.menuService.itemsMenu();
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/es|en/) ? browserLang : 'es');
  }

  ngOnInit(): void {
    this.getDataUser();
  }

  ngAfterViewInit(): void {
    if (this.photoUrlUser) {
      this.photoUser.nativeElement.style.backgroundImage = `url("${this.photoUrlUser}")`;
    }
  }

  getDataUser(): void {
    this.nameUser = this.authService.getPropertyFieldValue('name');

    this.photoUrlUser = this.authService.getUrlPhotoUser();
  }

  openMenuSide(): void {
    this.menu.open();
  }

  goTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.authService.logout();
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
  }
}
