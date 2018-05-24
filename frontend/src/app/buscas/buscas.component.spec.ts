import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscasComponent } from './buscas.component';

describe('BuscasComponent', () => {
  let component: BuscasComponent;
  let fixture: ComponentFixture<BuscasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
