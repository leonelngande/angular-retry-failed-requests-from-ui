import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConnectionStatusService} from '../../services/connection-status.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-try-again',
  template: `
    <div class="text-center">
      <ng-container *ngIf="(isOnline$ | async) === false">
        <span class="text-muted pb-5">
          📶🚫 <small>Offline</small>
        </span>
      </ng-container>
      <p class="text-muted">{{message}}</p>
      <button (click)="emitTryAgain()" class="btn btn-primary">
        Try Again
      </button>
    </div>

  `,
})
export class TryAgainComponent {

  /** Message to display to user in the template */
  @Input() message = 'Something went wrong.';

  /** Event emitted when the user clicks the Try Again button */
  @Output() tryAgain = new EventEmitter<boolean>();

  constructor(private connectionStatusService: ConnectionStatusService) { }

  /** Emits the tryAgain event */
  emitTryAgain() {
    this.tryAgain.emit(true);
  }

  /**
   * Getter for connection service's online$ property.
   * Primary use case is to avoid directly accessing the service in the template.
   */
  get isOnline$(): Observable<boolean> {
    return this.connectionStatusService.online$;
  }

}
