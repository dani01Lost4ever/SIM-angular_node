import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent {
  //if needed for additional logic
  @Output() addCardClick = new EventEmitter<void>();

  onClick() {
    this.addCardClick.emit();
  }
}
