import { ICustomEvent } from '../../../shared/event';
import { AbstractCursorEvent } from './AbstractCursorEvent';

export class MouseMoveEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'mouse:move';
}
