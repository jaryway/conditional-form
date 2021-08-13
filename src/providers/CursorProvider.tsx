import React, { FC, createContext, useEffect, useState, useRef } from 'react';
import { DragMoveEvent, DragStartEvent, DragStopEvent, MouseMoveEvent } from '../core/events';
import { CursorStatus, ICursorPosition } from '../core/models';
import { Hover } from '../core/models/Hover';
import { useDesigner, useForceUpdate } from '../hooks';
import { requestIdle } from '../shared/request-idle';

// export interface ICursorContext {
//   rect: DOMRect;
//   hover: Hover;
//   status: CursorStatus;
//   position: ICursorPosition;
// }

export interface ICursorHoverContext {
  rect: DOMRect;
  hover: Hover;
}

export interface ICursorPositionContext {
  position: ICursorPosition;
}

export interface ICursorDragPositionContext {
  dragStartPosition: ICursorPosition;
  dragEndPosition: ICursorPosition;
}

// export const CursorContext = createContext<ICursorContext>({} as any);
export const CursorStatusContext = createContext<CursorStatus>({} as any);
export const CursorHoverContext = createContext<ICursorHoverContext>({} as any);
export const CursorPositionContext = createContext<ICursorPositionContext>({} as any);
export const CursorDragPositionContext = createContext<ICursorDragPositionContext>({} as any);

const isEqualRect = (rect1: DOMRect, rect2: DOMRect) => {
  return (
    rect1?.x === rect2?.x &&
    rect1?.y === rect2?.y &&
    rect1?.width === rect2?.width &&
    rect1?.height === rect2?.height
  );
};

export const CursorStatusProvider: FC<any> = ({ children }) => {
  const engine = useDesigner();
  const oldStatus = useRef<CursorStatus>();
  const forceUpdate = useForceUpdate();

  const updateStatus = (status) => {
    if (oldStatus.current === status) return;
    oldStatus.current = status;
    engine.cursor.setStatus(status);
    forceUpdate();
  };

  useEffect(() => {
    engine.subscribeTo(MouseMoveEvent, (event) => {
      updateStatus(
        engine.cursor.status === CursorStatus.Dragging ||
          engine.cursor.status === CursorStatus.DragStart
          ? engine.cursor.status
          : CursorStatus.Normal,
      );
    });

    engine.subscribeTo(DragStartEvent, (event) => {
      updateStatus(CursorStatus.DragStart);
    });

    let cleanStatusRequest = null;
    engine.subscribeTo(DragMoveEvent, () => {
      updateStatus(CursorStatus.Dragging);
      clearTimeout(cleanStatusRequest);
      cleanStatusRequest = setTimeout(() => {
        updateStatus(CursorStatus.Normal);
      }, 1000);
    });

    engine.subscribeTo(DragStopEvent, (event) => {
      clearTimeout(cleanStatusRequest);
      updateStatus(CursorStatus.DragStop);
      requestIdle(() => {
        updateStatus(CursorStatus.Normal);
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('CursorStatus', engine.cursor.status);

  return (
    <CursorStatusContext.Provider value={engine.cursor.status}>
      {children}
    </CursorStatusContext.Provider>
  );
};

export const CursorHoverProvider: FC<any> = ({ children }) => {
  const engine = useDesigner();

  const oldRect = useRef<DOMRect>();

  const [rect, setRect] = useState<DOMRect>();
  const [hover, setHover] = useState<Hover>();

  useEffect(() => {
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

      if (!el) {
        setRect(undefined);
        return;
      }

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

  console.log('hover', hover?.node);

  return (
    <CursorHoverContext.Provider value={{ hover, rect }}>{children}</CursorHoverContext.Provider>
  );
};

export const CursorPostionProvider: FC<any> = ({ children }) => {
  const engine = useDesigner();
  const forceUpdate = useForceUpdate();

  const updatePosition = (data) => {
    engine.cursor.setPosition(data);
    forceUpdate();
  };

  useEffect(() => {
    engine.subscribeTo(MouseMoveEvent, (event) => {
      updatePosition(event.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CursorPositionContext.Provider value={{ position: engine.cursor.position }}>
      {children}
    </CursorPositionContext.Provider>
  );
};

export const CursorDragPostionProvider: FC<any> = ({ children }) => {
  const engine = useDesigner();
  const forceUpdate = useForceUpdate();

  const updateDragStartPosition = (data) => {
    engine.cursor.setDragStartPosition(data);
    forceUpdate();
  };

  const updateDragEndPosition = (data) => {
    engine.cursor.setDragEndPosition(data);
    forceUpdate();
  };

  useEffect(() => {
    engine.subscribeTo(DragStartEvent, (event) => {
      updateDragStartPosition(event.data);
    });

    engine.subscribeTo(DragStopEvent, (event) => {
      updateDragEndPosition(event.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CursorDragPositionContext.Provider
      value={{
        dragStartPosition: engine.cursor.dragStartPosition,
        dragEndPosition: engine.cursor.dragEndPosition,
      }}
    >
      {children}
    </CursorDragPositionContext.Provider>
  );
};

export const CursorProvider: FC<any> = ({ children }) => {
  return (
    <CursorStatusProvider>
      <CursorHoverProvider>
        <CursorDragPostionProvider>
          <CursorPostionProvider>{children}</CursorPostionProvider>
        </CursorDragPostionProvider>
      </CursorHoverProvider>
    </CursorStatusProvider>
  );
};

export default CursorProvider;
