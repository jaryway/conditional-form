import React, { FC, createContext, useEffect, useState, useRef } from 'react';
import { DragMoveEvent, DragStartEvent, DragStopEvent, MouseMoveEvent } from '../core/events';
import { CursorStatus, ICursorPosition } from '../core/models';
import { Hover } from '../core/models/Hover';
import useDesigner from '../hooks/useDesigner';
import { requestIdle } from '../shared/request-idle';

export interface ICursorContext {
  rect: DOMRect;
  hover: Hover;
  status: CursorStatus;
  position: ICursorPosition;
}

export const CursorContext = createContext<ICursorContext>({} as any);

const isEqualRect = (rect1: DOMRect, rect2: DOMRect) => {
  return (
    rect1?.x === rect2?.x &&
    rect1?.y === rect2?.y &&
    rect1?.width === rect2?.width &&
    rect1?.height === rect2?.height
  );
};

export const CursorProvider: FC<any> = ({ children }) => {
  const engine = useDesigner();
  const oldRect = useRef<DOMRect>();

  const [rect, setRect] = useState<DOMRect>();
  const [hover, setHover] = useState<Hover>();
  const [status, setStatus] = useState<CursorStatus>(engine.cursor.status);
  const [position, setPosition] = useState<ICursorPosition>(engine.cursor.position);

  const updateState = () => {
    setStatus(engine.cursor.status);
    setPosition(engine.cursor.position);
  };

  useEffect(() => {
    engine.subscribeTo(MouseMoveEvent, (event) => {
      engine.cursor.setStatus(
        engine.cursor.status === CursorStatus.Dragging ||
          engine.cursor.status === CursorStatus.DragStart
          ? engine.cursor.status
          : CursorStatus.Normal,
      );
      engine.cursor.setPosition(event.data);
      updateState();
    });

    engine.subscribeTo(DragStartEvent, (event) => {
      engine.cursor.setStatus(CursorStatus.DragStart);
      engine.cursor.setDragStartPosition(event.data);
      updateState();
    });

    let cleanStatusRequest = null;
    engine.subscribeTo(DragMoveEvent, () => {
      engine.cursor.setStatus(CursorStatus.Dragging);
      clearTimeout(cleanStatusRequest);
      cleanStatusRequest = setTimeout(() => {
        engine.cursor.setStatus(CursorStatus.Normal);
      }, 1000);

      updateState();
    });

    engine.subscribeTo(DragStopEvent, (event) => {
      clearTimeout(cleanStatusRequest);
      engine.cursor.setStatus(CursorStatus.DragStop);
      engine.cursor.setDragEndPosition(event.data);
      requestIdle(() => {
        engine.cursor.setStatus(CursorStatus.Normal);
      });

      updateState();
    });

    engine.subscribeTo(MouseMoveEvent, (event) => {
      const currentWorkspace = event?.context?.workspace;
      // console.log('onMount.el', event?.context);
      if (!currentWorkspace) return;
      const operation = currentWorkspace.operation;
      if (engine.cursor.status !== CursorStatus.Normal) {
        operation.hover.clear();
        return;
      }
      const target = event.data.target as HTMLElement;
      const el = target?.closest?.(`
        *[${engine.props.nodeIdAttrName}],
        *[${engine.props.outlineNodeIdAttrName}]
      `);

      if (!el) return;

      const nextRect = el.getBoundingClientRect?.();
      if (!isEqualRect(oldRect.current, nextRect)) {
        // 矩形发生变化的时候才更新 state
        oldRect.current = nextRect;
      }
      setRect(nextRect);

      if (!el?.getAttribute) {
        return;
      }

      const nodeId = el.getAttribute(engine.props.nodeIdAttrName);
      const outlineNodeId = el.getAttribute(engine.props.outlineNodeIdAttrName);
      const node = operation.tree.findById(nodeId || outlineNodeId);
      if (node) {
        operation.hover.setHover(node);
      } else {
        operation.hover.clear();
      }
      setHover(operation.hover);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CursorContext.Provider value={{ hover, rect, status, position }}>
      {children}
    </CursorContext.Provider>
  );
};

export default CursorProvider;
