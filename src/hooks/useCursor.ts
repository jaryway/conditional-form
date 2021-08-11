// import { Engine, CursorStatus } from '../core/models';
// import { MouseMoveEvent, DragStartEvent, DragMoveEvent, DragStopEvent } from '../core/events';
import { useContext } from 'react';
import { CursorContext } from '../providers/CursorProvider';
// import { requestIdle } from '@designable/shared';

export const useCursor = () => {
  return useContext(CursorContext);
};
