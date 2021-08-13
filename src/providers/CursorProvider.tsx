import React, { FC, createContext, useEffect, useRef } from 'react';
import { DragMoveEvent, DragStartEvent, DragStopEvent, MouseMoveEvent } from '../core/events';
import { CursorStatus, ICursorPosition } from '../core/models';
import { Hover } from '../core/models/Hover';
import { useDesigner, useForceUpdate, useWorkspace } from '../hooks';
import { requestIdle } from '../shared/request-idle';

// export interface ICursorContext {
//   rect: DOMRect;
//   hover: Hover;
//   status: CursorStatus;
//   position: ICursorPosition;
// }

export interface ICursorHoverContext {
  // rect: DOMRect;
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

// const isEqualHovr = (rect1: DOMRect, rect2: DOMRect) => {
//   return (
//     rect1?.x === rect2?.x &&
//     rect1?.y === rect2?.y &&
//     rect1?.width === rect2?.width &&
//     rect1?.height === rect2?.height
//   );
// };

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

  return (
    <CursorStatusContext.Provider value={engine.cursor.status}>
      {children}
    </CursorStatusContext.Provider>
  );
};

export const CursorHoverProvider: FC<any> = ({ children }) => {
  const oldNode = useRef<Node>();
  const engine = useDesigner();
  const workspace = useWorkspace();
  const forceUpdate = useForceUpdate();

  const updateNode = (node) => {
    if (oldNode.current === node) return;
    oldNode.current = node;
    forceUpdate();
  };

  useEffect(() => {
    engine.subscribeTo(MouseMoveEvent, (event) => {
      const currentWorkspace = event?.context?.workspace;

      if (!currentWorkspace) return;
      const operation = currentWorkspace.operation;
      if (engine.cursor.status !== CursorStatus.Normal) {
        operation.hover.clear();
        updateNode(operation.hover.node);
        return;
      }
      const target = event.data.target as HTMLElement;
      const el = target?.closest?.(`
        *[${engine.props.nodeIdAttrName}],
        *[${engine.props.outlineNodeIdAttrName}]
      `);

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
      updateNode(operation.hover.node);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hover = { ...workspace?.operation?.hover } as Hover;

  return <CursorHoverContext.Provider value={{ hover }}>{children}</CursorHoverContext.Provider>;
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
