import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroOfertasComponent } from './filtro-ofertas.component';

describe('FiltroOfertasComponent', () => {
  let component: FiltroOfertasComponent;
  let fixture: ComponentFixture<FiltroOfertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroOfertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
