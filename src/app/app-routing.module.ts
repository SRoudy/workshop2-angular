import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NotfoundComponent } from './core/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  { path: 'home', component: HomeComponent },
  
  { path: 'listSuggestion', redirectTo: '/suggestions', pathMatch: 'full' },
  
  {
    path: 'suggestions',
    loadChildren: () => import('./features/suggestions/suggestions.module').then(m => m.SuggestionsModule)
  },
  
  // Lazy Loading pour le module Users
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
  },
  
  // Route 404
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }