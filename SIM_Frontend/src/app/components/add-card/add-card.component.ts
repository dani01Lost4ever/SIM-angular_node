import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent {
  @Output() addCardClick = new EventEmitter<void>();

  onClick() {
    this.addCardClick.emit();
  }
}
