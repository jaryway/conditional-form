import React, { FC, Reducer, useReducer, useContext, useEffect, useRef } from 'react';

import { DragMoveEvent, DragStartEvent, DragStopEvent } from '../../core/events';
import { useDesigner } from '../../hooks';
// import { useCursor, usePrefix, useDesigner } from '../../hooks'
// import { CursorStatus } from '@designable/core'
// import { TextWidget } from '../TextWidget'
import './styles.less';
// interface Point {
//   x: number;
//   y: number;
// }
// const isEqualPosition=
// const isEqualPoint = (point1: Point, point2: Point) => {
//   return point1?.x === point2?.x && point1?.y === point2?.y;
// };

export const GhostWidget: FC<any> = () => {
  const initialState = { x: 0, y: 0 };
  // const pointRef = useRef<{ x: number; y: number }>(initialState);
  // const { engine, setCursorStatus } = useContext(AppContext);
  const engine = useDesigner();

  const reducer = (state: any, action: DragMoveEvent | DragStartEvent | DragStopEvent) => {
    const { data, type } = action;

    // if (action instanceof DragStartEvent) {
    //   return { ...state, x: data.clientX, y: data.clientY, dragging: true };
    // }

    switch (type) {
      case 'drag:start':
        return { ...state, x: data.clientX, y: data.clientY, dragging: true };
      case 'drag:move': {
        // const point = { x: data.clientX, y: data.clientY };
        return { ...state, x: data.clientX, y: data.clientY };
      }
      case 'drag:stop':
        return { ...state, x: 0, y: 0, dragging: false };
      default:
        return state;
    }
  };
  const [{ x, y, dragging }, dispatch] = useReducer<Reducer<any, any>>(reducer, initialState);
  // console.log('xxxxxxxxx-renader');
  useEffect(() => {
    engine.subscribeTo(DragStartEvent, (e) => dispatch(e));
    engine.subscribeTo(DragMoveEvent, (e) => dispatch(e));
    engine.subscribeTo(DragStopEvent, (e) => dispatch(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   // fix warning
  //   setCursorStatus(dragging ? 'DRAGGING' : 'NORMAL');
  // }, [setCursorStatus, dragging]);

  // console.log('ssssssssssssss', dragging, x, y);

  return dragging ? (
    <div
      className={'dn-ghost'}
      style={{
        transform: `perspective(1px) translate3d(${x - 18}px,${y - 12}px,0) scale(0.8)`,
      }}
    >
      Ghost
      {/* {renderNodes()} */}
    </div>
  ) : null;
};

GhostWidget.displayName = 'GhostWidget';
