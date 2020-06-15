import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './modules/core/core.module';
import { UserModule } from './modules/user/user.module';
import { LoginComponent } from './modules/core/login/login.component';
import { UserListComponent } from './modules/user/user-list/user-list.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RecipeModule } from './modules/recipe/recipe.module';
import { RecipeListComponent } from './modules/recipe/recipe-list/recipe-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'user',
    component: UserListComponent,
    canActivate: [AuthenticationGuard],
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
