import React, { FC, Reducer, useReducer, useContext, useEffect } from 'react';
import { AppContext } from '../context';
// import { useCursor, usePrefix, useDesigner } from '../../hooks'
// import { CursorStatus } from '@designable/core'
// import { observer } from '@formily/reactive-react'
// import { TextWidget } from '../TextWidget'
import './styles.less';

export const GhostWidget: FC<any> = () => {
  const initialState = { x: 0, y: 0 };
  const reducer = (state: any, action: any) => {
    const { payload } = action;
    switch (action.type) {
      case 'drop:start':
        // const target = payload.target as HTMLElement;
        // if (target?.closest?.('*[data-designer-source-id]')) {
        // }

        return { ...state, x: payload.clientX, y: payload.clientY, dragging: true };
      case 'drop:move':
        return { ...state, x: payload.clientX, y: payload.clientY };
      case 'drop:stop':
        return { ...state, x: 0, y: 0, dragging: false };
    }
  };
  const [{ x, y, dragging }, dispatch] = useReducer<Reducer<any, any>>(reducer, initialState);

  const { engine } = useContext(AppContext);

  useEffect(() => {
    engine.subscribe((e: any) => dispatch(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
