import React, { FC, Reducer, useContext, useEffect, useReducer, useRef } from 'react';
import { AppContext } from '../../../context';
import { MouseMoveEvent } from '../../../core/events';
import { CursorStatus } from '../../../core/models';
import { useCursor } from '../../../hooks/useCursor';
// import { useHover, usePrefix, useValidNodeOffsetRect, useSelection } from '../../hooks';
// import { TextWidget } from '../TextWidget';
// import { observer } from '@formily/reactive-react';
const isEqualRect = (rect1: DOMRect, rect2: DOMRect) => {
  return (
    rect1?.x === rect2?.x &&
    rect1?.y === rect2?.y &&
    rect1?.width === rect2?.width &&
    rect1?.height === rect2?.height
  );
};

export const DashedBox: FC<any> = () => {
  // const { engine, cursorStatus } = useContext(AppContext);

  const { status, rect } = useCursor();

  const prefix = 'dn-aux-dashed-box';
  // const rectRef = useRef<DOMRect>();

  // const initialState = { x: 0, y: 0 };
  // const reducer = (state: any, e: MouseMoveEvent) => {
  //   const target = e.data.target as HTMLElement;

  //   const el = target?.closest?.(`*[${engine.props.nodeIdAttrName}]`);
  //   if (!el) return state;

  //   const rect = el.getBoundingClientRect?.();
  //   if (!isEqualRect(rectRef.current, rect)) {
  //     // 矩形发生变化的时候才更新 state
  //     rectRef.current = rect;
  //     return { ...state, rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height } };
  //   }

  //   return state;
  // };
  // const [{ rect }, dispatch] = useReducer<Reducer<any, any>>(reducer, initialState);

  // useEffect(() => {
  //   engine.subscribeTo(MouseMoveEvent, dispatch);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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


  // console.log('cursorStatus', rect);
  if (status !== CursorStatus.Normal) return null;
  if (!rect) return null;

  

  // if (hover.node.hidden) return null;
  // if (selection.selected.includes(hover.node.id)) return null;
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
        {/* <TextWidget>{hover?.node?.designerProps?.title}</TextWidget> */}
      </span>
    </div>
  );
};

DashedBox.displayName = 'DashedBox';
