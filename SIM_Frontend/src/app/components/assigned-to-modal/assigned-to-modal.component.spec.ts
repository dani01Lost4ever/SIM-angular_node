import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedToModalComponent } from './assigned-to-modal.component';

describe('AssignedToModalComponent', () => {
  let component: AssignedToModalComponent;
  let fixture: ComponentFixture<AssignedToModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedToModalComponent]
    });
    fixture = TestBed.createComponent(AssignedToModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
