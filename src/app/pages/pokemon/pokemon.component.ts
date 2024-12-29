import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon',
  standalone: true,
  imports: [],
  templateUrl: './pokemon.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonComponent implements OnInit {
  public pokemon = signal<Pokemon | null>(null);

  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  private pokemonService = inject(PokemonService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.pokemonService
      .loadPokemon(id)
      .pipe(
        tap((pokemon) => {
          const pageTitle = `${pokemon.id} - ${pokemon.name}`;
          const pageDescription = `Pagina del Pokemon ${pokemon.name}`;
          this.title.setTitle(pageTitle);
          this.meta.updateTag({
            name: 'description',
            content: pageDescription,
          });
          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({
            name: 'og:description',
            content: pageDescription,
          });
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
          });
        })
      )
      .subscribe(this.pokemon.set);
  }
}
