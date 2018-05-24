import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancharErrorComponent } from './lanchar-error.component';

describe('LancharErrorComponent', () => {
  let component: LancharErrorComponent;
  let fixture: ComponentFixture<LancharErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancharErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancharErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
