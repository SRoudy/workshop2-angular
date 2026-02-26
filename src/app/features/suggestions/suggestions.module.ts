import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // ← AJOUT

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';

@NgModule({
  declarations: [
    SuggestionsComponent,
    SuggestionListComponent,
    SuggestionDetailsComponent,
    SuggestionFormComponent  // ← Normalement ajouté automatiquement
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // ← IMPORTANT pour les Reactive Forms
    SuggestionsRoutingModule
  ]
})
export class SuggestionsModule { }