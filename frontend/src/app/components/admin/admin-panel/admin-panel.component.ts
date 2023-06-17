import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent {
  displayComponent: string = '';

  showComponent(componentName: string) {
    this.displayComponent = componentName;
  }
}
