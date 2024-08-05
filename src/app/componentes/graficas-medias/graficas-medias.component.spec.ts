import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasMediasComponent } from './graficas-medias.component';

describe('GraficasMediasComponent', () => {
  let component: GraficasMediasComponent;
  let fixture: ComponentFixture<GraficasMediasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficasMediasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficasMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
