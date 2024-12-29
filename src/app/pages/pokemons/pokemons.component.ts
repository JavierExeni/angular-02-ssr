import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  // private appRef = inject(ApplicationRef);
  // public isLoading = signal(true);

  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log(isStable);
  // });

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe(params => {})
    this.loadPokemons();
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }

  public loadPokemons(page: number = 0) {
    const pageToLoad = this.currentPage()! + page;

    this.pokemonService
      .loadPage(pageToLoad)
      .pipe(
        tap(() =>
          this.router.navigate([], { queryParams: { page: pageToLoad } })
        ),
        tap(() =>
          this.title.setTitle('Pokemosn ssr - Page ' + pageToLoad)
        )
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });

    this.pokemonService.loadPage(pageToLoad).subscribe((pokemons) => {
      this.pokemons.set(pokemons);
    });
  }
}
