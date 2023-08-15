import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoModalButtonsComponent } from './add-todo-modal-buttons.component';

describe('AddTodoModalButtonsComponent', () => {
  let component: AddTodoModalButtonsComponent;
  let fixture: ComponentFixture<AddTodoModalButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTodoModalButtonsComponent]
    });
    fixture = TestBed.createComponent(AddTodoModalButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
