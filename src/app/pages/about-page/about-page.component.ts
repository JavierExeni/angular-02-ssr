import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi about page',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'About page',
    });
    this.meta.updateTag({
      name: 'keyword',
      content: 'Hola,mundo,Javier,Exeni',
    });
  }
}
