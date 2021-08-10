// import { ICustomEvent } from '@designable/shared'
import { ICustomEvent } from '../../../shared/event';
import { AbstractCursorEvent } from './AbstractCursorEvent';

export class DragMoveEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'drag:move';
}
