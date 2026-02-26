import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';

const routes: Routes = [
  {
    path: '',
    component: SuggestionsComponent,
    children: [
      { path: '', component: SuggestionListComponent },
      { path: 'add', component: SuggestionFormComponent },  // ← NOUVELLE ROUTE
      { path: ':id', component: SuggestionDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }