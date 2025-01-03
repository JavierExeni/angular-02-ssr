import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      document.title = 'Pricing page';
    }
    // this.title.setTitle('Pricing Page');
    // this.meta.updateTag({
    //   name: 'description',
    //   content: 'Este es mi Pricing page',
    // });
    // this.meta.updateTag({
    //   name: 'og:title',
    //   content: 'Pricing page',
    // });
    // this.meta.updateTag({
    //   name: 'keyword',
    //   content: 'Hola,mundo,Javier,Exeni',
    // });
  }
}
