import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglesectionComponent } from './singlesection.component';

describe('SinglesectionComponent', () => {
  let component: SinglesectionComponent;
  let fixture: ComponentFixture<SinglesectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglesectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglesectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
