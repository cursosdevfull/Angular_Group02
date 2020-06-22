import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './modules/core/core.module';
import { UserModule } from './modules/user/user.module';
import { LoginComponent } from './modules/core/login/login.component';
import { UserListComponent } from './modules/user/user-list/user-list.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RecipeModule } from './modules/recipe/recipe.module';
import { RecipeListComponent } from './modules/recipe/recipe-list/recipe-list.component';
import { ApiEndpointInterceptor } from './interceptors/api-endpoint.interceptor';
import { InsertUserComponent } from './modules/user/insert-user/insert-user.component';
import { EditUserComponent } from './modules/user/edit-user/edit-user.component';
import { EditUserResolve } from './resolves/edit-user.resolve';
import { RolesAllowedDirective } from './directives/roles-allowed.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'user',
    canActivateChild: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'new',
        component: InsertUserComponent,
      },
      {
        path: 'edit/:id',
        component: EditUserComponent,
        resolve: {
          response: EditUserResolve,
        },
      },
    ],
  },
  {
    path: 'recipe',
    component: RecipeListComponent,
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    UserModule,
    RecipeModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiEndpointInterceptor,
      multi: true,
    },
    EditUserResolve,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
