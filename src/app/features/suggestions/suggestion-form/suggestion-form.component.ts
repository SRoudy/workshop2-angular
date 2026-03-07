import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  isEditMode = false;
  suggestionId: number = 0;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.suggestionId = +params['id'];
        this.loadSuggestion();
      }
    });
  }

  initForm(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^[A-Z][a-zA-Z]*$/)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
      status: [{ value: 'en_attente', disabled: true }]
    });
  }

  loadSuggestion(): void {
    this.suggestionService.getSuggestionById(this.suggestionId).subscribe({
      next: (suggestion) => {
        this.suggestionForm.patchValue({
          title: suggestion.title,
          description: suggestion.description,
          category: suggestion.category,
          date: new Date(suggestion.date).toISOString().split('T')[0],
          status: suggestion.status
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la suggestion:', err);
        alert('Impossible de charger la suggestion !');
        this.router.navigate(['/suggestions']);
      }
    });
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.getRawValue();
      
      const suggestion: Suggestion = {
        id: this.isEditMode ? this.suggestionId : 0,  // ← CORRECTION : utilisez suggestionId en mode édition
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        date: new Date(formValue.date),
        status: formValue.status,
        nbLikes: 0
      };

      if (this.isEditMode) {
        // Mode édition : UPDATE
        this.suggestionService.updateSuggestion(suggestion).subscribe({
          next: () => {
            alert('Suggestion modifiée avec succès !');
            this.router.navigate(['/suggestions']);
          },
          error: (err) => {
            console.error('Erreur lors de la modification:', err);
            alert('Erreur lors de la modification de la suggestion !');
          }
        });
      } else {
        // Mode ajout : CREATE
        this.suggestionService.addSuggestion(suggestion).subscribe({
          next: () => {
            alert('Suggestion ajoutée avec succès !');
            this.router.navigate(['/suggestions']);
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout:', err);
            alert('Erreur lors de l\'ajout de la suggestion !');
          }
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/suggestions']);
  }

  get title() {
    return this.suggestionForm.get('title');
  }

  get description() {
    return this.suggestionForm.get('description');
  }

  get category() {
    return this.suggestionForm.get('category');
  }
}