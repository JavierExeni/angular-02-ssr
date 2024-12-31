import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let compiled: HTMLDivElement;

  @Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [],
  })
  class MockNavBarComponent {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    })
      .overrideComponent(AppComponent, {
        add: {
          imports: [MockNavBarComponent],
        },
        remove: {
          imports: [NavbarComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should render the navbar and router-outlet`, () => {
    const routerOutlet = compiled.querySelector('router-outlet');
    const navBar = compiled.querySelector('app-navbar');
    expect(routerOutlet).not.toBeNull();
    expect(navBar).not.toBeNull();
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pokemon-ssr');
  // });
});
