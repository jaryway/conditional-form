import { ICustomEvent } from '../../../shared/event';
import { AbstractCursorEvent } from './AbstractCursorEvent';

export class MouseClickEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'mouse:click';
}
