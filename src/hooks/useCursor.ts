// import { Engine, CursorStatus } from '../core/models';
// import { MouseMoveEvent, DragStartEvent, DragMoveEvent, DragStopEvent } from '../core/events';
import { useContext } from 'react';
import {
  CursorStatusContext,
  CursorPositionContext,
  CursorHoverContext,
  CursorDragPositionContext,
} from '../providers/CursorProvider';
// import { requestIdle } from '@designable/shared';

// export const useCursor = () => {
//   return useContext(CursorContext);
// };

export const useCursorStatus = () => {
  return useContext(CursorStatusContext);
};

export const useCursorHover = () => {
  return useContext(CursorHoverContext);
};

export const useCursorPosition = () => {
  return useContext(CursorPositionContext);
};

export const useCursorDragPosition = () => {
  return useContext(CursorDragPositionContext);
};
