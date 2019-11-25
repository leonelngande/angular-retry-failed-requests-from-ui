import {Injectable} from '@angular/core';
import {fromEvent, merge, Observable, of} from 'rxjs';
import {mapTo} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ConnectionStatusService {

  /**
   * This code returning a false value means you're absolutely offline as in disconnected.
   * It returning true doesn't necessarily indicate that there's a practically usable connection.
   *
   * @see https://stackoverflow.com/a/39573363/6924437
   * @see https://justmarkup.com/articles/2016-08-18-indicating-offline/
   */
  readonly online$: Observable<boolean> = merge(
    of(navigator.onLine),
    fromEvent(window, 'online').pipe(mapTo(true)),
    fromEvent(window, 'offline').pipe(mapTo(false)),
  );

}
