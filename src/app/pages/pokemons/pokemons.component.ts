import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent {
  private pokemonService = inject(PokemonService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  public loadOnPageChange = effect(
    () => {
      this.loadPokemons(this.currentPage());
    },
    {
      allowSignalWrites: true,
    }
  );

  public loadPokemons(page: number = 0) {
    this.pokemonService
      .loadPage(page)
      .pipe(tap(() => this.title.setTitle('Pokemosn ssr - Page ' + page)))
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
