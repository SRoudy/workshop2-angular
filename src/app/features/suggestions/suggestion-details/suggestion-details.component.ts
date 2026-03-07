import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrls: ['./suggestion-details.component.css']
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion: Suggestion | undefined;
  suggestionId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.suggestionId = +params['id'];
      console.log('ID récupéré:', this.suggestionId);  // DEBUG
      
      this.suggestionService.getSuggestionById(this.suggestionId).subscribe({
        next: (data) => {
          console.log('Données reçues:', data);  // DEBUG
          this.suggestion = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des détails:', err);
          alert('Suggestion non trouvée !');
          this.router.navigate(['/suggestions']);
        }
      });
    });
  }

  backToList(): void {
    this.router.navigate(['/suggestions']);
  }

  updateSuggestion(): void {
    this.router.navigate(['/suggestions/edit', this.suggestionId]);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'acceptee': return 'status-accepted';
      case 'refusee': return 'status-refused';
      case 'en_attente': return 'status-pending';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'acceptee': return 'acceptee';
      case 'refusee': return 'refusee';
      case 'en_attente': return 'en_attente';
      default: return status;
    }
  }
}
