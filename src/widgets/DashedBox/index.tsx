import React, { FC, Reducer, useContext, useReducer } from 'react';
import { AppContext } from '../../context';
// import { useHover, usePrefix, useValidNodeOffsetRect, useSelection } from '../../hooks';
// import { TextWidget } from '../TextWidget';
// import { observer } from '@formily/reactive-react';

export const DashedBox:FC<any> = () => {

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
    

  const createTipsStyle = () => {
    const baseStyle: React.CSSProperties = {
      top: 0,
      left: 0,
      pointerEvents: 'none',
      boxSizing: 'border-box',
      visibility: 'hidden',
      zIndex: 2,
    };
    if (rect) {
      baseStyle.transform = `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`;
      baseStyle.height = rect.height;
      baseStyle.width = rect.width;
      baseStyle.visibility = 'visible';
    }
    return baseStyle;
  };

  if (!hover.node) return null;
  if (hover.node.hidden) return null;
  if (selection.selected.includes(hover.node.id)) return null;
  return (
    <div className={prefix} style={createTipsStyle()} data-dashed="xxx">
      <span
        className={prefix + '-title'}
        style={{
          position: 'absolute',
          bottom: '100%',
          left: 0,
          fontSize: 12,
          userSelect: 'none',
          fontWeight: 'lighter',
          whiteSpace: 'nowrap',
        }}
      >
        <TextWidget>{hover?.node?.designerProps?.title}</TextWidget>
      </span>
    </div>
  );
});

DashedBox.displayName = 'DashedBox';
