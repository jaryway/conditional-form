import { ICustomEvent } from '../../../shared/event';
import { AbstractCursorEvent } from './AbstractCursorEvent';

export class DragStartEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'drag:start';
}
