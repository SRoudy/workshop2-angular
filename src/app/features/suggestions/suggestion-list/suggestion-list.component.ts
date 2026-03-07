import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent implements OnInit {
  searchText = '';
  favorites: Suggestion[] = [];
  suggestions: Suggestion[] = [];

  constructor(
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getSuggestionsList().subscribe({
      next: (data) => {
        this.suggestions = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des suggestions:', err);
        alert('Erreur lors du chargement des suggestions. Vérifiez que le backend est démarré.');
      }
    });
  }

  incrementLikes(suggestion: Suggestion): void {
    this.suggestionService.incrementLikes(suggestion.id).subscribe({
      next: (updatedSuggestion) => {
        // Mettre à jour localement
        const index = this.suggestions.findIndex(s => s.id === suggestion.id);
        if (index !== -1) {
          this.suggestions[index] = updatedSuggestion;
        }
      },
      error: (err) => {
        console.error('Erreur lors de l\'incrémentation des likes:', err);
      }
    });
  }

  addToFavorites(suggestion: Suggestion): void {
    const alreadyExists = this.favorites.some(fav => fav.id === suggestion.id);
    if (!alreadyExists) {
      this.favorites.push(suggestion);
      alert(`"${suggestion.title}" a été ajouté aux favoris !`);
    } else {
      alert(`"${suggestion.title}" est déjà dans les favoris !`);
    }
  }

  isFavorite(suggestion: Suggestion): boolean {
    return this.favorites.some(fav => fav.id === suggestion.id);
  }

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchText.trim()) {
      return this.suggestions;
    }
    const searchLower = this.searchText.toLowerCase();
    return this.suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(searchLower) ||
      suggestion.category.toLowerCase().includes(searchLower)
    );
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

  viewDetails(id: number): void {
    this.router.navigate(['/suggestions', id]);
  }

  addSuggestion(): void {
    this.router.navigate(['/suggestions/add']);
  }
  deleteSuggestion(id: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette suggestion ?')) {
    this.suggestionService.deleteSuggestion(id).subscribe({
      next: () => {
        alert('Suggestion supprimée avec succès !');
        // Recharger la liste
        this.loadSuggestions();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression:', err);
        alert('Erreur lors de la suppression de la suggestion !');
      }
    });
  }
}
}