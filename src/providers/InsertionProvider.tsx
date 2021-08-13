import React, { createContext, FC, useEffect } from 'react';
import { ClosestDirection, CursorType, TreeNode } from '../core/models';
import { DragMoveEvent, DragStartEvent, DragStopEvent } from '../core/events';
import { useDesigner, useForceUpdate, useWorkspace } from '../hooks';
import { Point } from '../shared';

/**
 * 1、更新拖拽插入的位置
 * 2、高亮 放置 对象
 * 3、高亮 拖动 对象
 */
export const InsertionContenxt = createContext<{
  closestDirection: ClosestDirection;
  closestOffsetRect: DOMRect;
  closestRect: DOMRect;
  closestNode: TreeNode;
}>({} as any);

export const InsertionProvider: FC<any> = ({ children }) => {
  const engine = useDesigner();
  const workspace = useWorkspace();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    engine.subscribeTo(DragStartEvent, (event) => {
      if (engine.cursor.type !== CursorType.Move) return;
      const target = event.data.target as HTMLElement;
      const el = target?.closest(`
             *[${engine.props.nodeIdAttrName}],
             *[${engine.props.sourceIdAttrName}],
             *[${engine.props.outlineNodeIdAttrName}]
            `);
      if (!el?.getAttribute) return;
      const sourceId = el?.getAttribute(engine.props.sourceIdAttrName);
      const outlineId = el?.getAttribute(engine.props.outlineNodeIdAttrName);
      const nodeId = el?.getAttribute(engine.props.nodeIdAttrName);
      engine.workbench.eachWorkspace((currentWorkspace) => {
        const operation = currentWorkspace.operation;

        if (nodeId || outlineId) {
          const node = engine.findNodeById(outlineId || nodeId);
          if (operation.focusNode && operation.focusNode.contains(node)) {
            operation.setDragNodes([operation.focusNode]);
            return;
          } else {
            operation.focusClean();
          }
          if (node) {
            if (node?.designerProps?.draggable === false) return;
            if (node === node.root) return;
            const validSelected = engine.getAllSelectedNodes().filter((node) => {
              if (node) {
                return node?.designerProps?.draggable !== false && node !== node.root;
              }
              return false;
            });
            if (validSelected.some((selectNode) => selectNode === node)) {
              operation.setDragNodes(operation.sortNodes(validSelected));
            } else {
              operation.setDragNodes([node]);
            }
          }
        } else if (sourceId) {
          const sourceNode = engine.findSourceNodeById(sourceId);
          if (sourceNode) {
            if (sourceNode?.designerProps?.draggable === false) return;
            operation.setDragNodes([sourceNode]);
          }
        }
      });
      forceUpdate();
    });

    engine.subscribeTo(DragMoveEvent, (event) => {
      // console.log('useDragDropEffect-DragMoveEvent',event.data.target,engine.props.nodeIdAttrName,engine.props.outlineNodeIdAttrName);
      if (engine.cursor.type !== CursorType.Move) return;
      const target = event.data.target as HTMLElement;
      const el = target?.closest(`
            *[${engine.props.nodeIdAttrName}],
            *[${engine.props.outlineNodeIdAttrName}]
          `);
      const nodeId = el?.getAttribute(engine.props.nodeIdAttrName);
      const outlineId = el?.getAttribute(engine.props.outlineNodeIdAttrName);
      engine.workbench.eachWorkspace((currentWorkspace) => {
        const operation = currentWorkspace.operation;
        const tree = operation.tree;
        const point = new Point(event.data.topClientX, event.data.topClientY);
        const dragNodes = operation.getDragNodes();
        if (!dragNodes.length) return;
        const touchNode = tree.findById(outlineId || nodeId);
        operation.dragWith(point, touchNode);

        // forceUpdate();
      });
    });

    // engine.subscribeTo(ViewportScrollEvent, (event) => {
    //   if (engine.cursor.type !== CursorType.Move) return;
    //   const point = new Point(engine.cursor.position.topClientX, engine.cursor.position.topClientY);
    //   const currentWorkspace = event?.context?.workspace;
    //   if (!currentWorkspace) return;
    //   const operation = currentWorkspace.operation;
    //   if (!operation.getDragNodes()?.length) return;
    //   const tree = operation.tree;
    //   const viewport = currentWorkspace.viewport;
    //   const outline = currentWorkspace.outline;
    //   const viewportTarget = viewport.elementFromPoint(point);
    //   const outlineTarget = outline.elementFromPoint(point);
    //   const viewportNodeElement = viewportTarget?.closest(`
    //         *[${engine.props.nodeIdAttrName}],
    //         *[${engine.props.outlineNodeIdAttrName}]
    //       `);
    //   const outlineNodeElement = outlineTarget?.closest(`
    //       *[${engine.props.nodeIdAttrName}],
    //       *[${engine.props.outlineNodeIdAttrName}]
    //     `);
    //   const nodeId = viewportNodeElement?.getAttribute(engine.props.nodeIdAttrName);
    //   const outlineNodeId = outlineNodeElement?.getAttribute(engine.props.outlineNodeIdAttrName);
    //   const touchNode = tree.findById(outlineNodeId || nodeId);
    //   operation.dragWith(point, touchNode);
    // });

    engine.subscribeTo(DragStopEvent, () => {
      if (engine.cursor.type !== CursorType.Move) return;

      engine.workbench.eachWorkspace((currentWorkspace) => {
        const operation = currentWorkspace.operation;
        const dragNodes = operation.getDragNodes();
        const closestNode = operation.getClosestNode();
        const closestDirection = operation.getClosestDirection();
        const selection = operation.selection;
        if (!dragNodes.length) return;
        if (dragNodes.length && closestNode && closestDirection) {
          if (
            closestDirection === ClosestDirection.After ||
            closestDirection === ClosestDirection.Under
          ) {
            console.log('TreeProvider.aaaaa', operation.tree);
            if (closestNode.allowSibling(dragNodes)) {
              selection.batchSafeSelect(closestNode.insertAfter(...dragNodes));
            }
          } else if (
            closestDirection === ClosestDirection.Before ||
            closestDirection === ClosestDirection.Upper
          ) {
            console.log('TreeProvider.bbbbb', operation.tree);
            if (closestNode.allowSibling(dragNodes)) {
              selection.batchSafeSelect(closestNode.insertBefore(...dragNodes));
            }
          } else if (
            closestDirection === ClosestDirection.Inner ||
            closestDirection === ClosestDirection.InnerAfter
          ) {
            console.log('TreeProvider.ccccc', operation.tree);
            if (closestNode.allowAppend(dragNodes)) {
              selection.batchSafeSelect(closestNode.appendNode(...dragNodes));
              operation.setDropNode(closestNode);
            }
          } else if (closestDirection === ClosestDirection.InnerBefore) {
            console.log('TreeProvider.ddddd', operation.tree);
            if (closestNode.allowAppend(dragNodes)) {
              selection.batchSafeSelect(closestNode.prependNode(...dragNodes));
              operation.setDropNode(closestNode);
            }
          }
        }
        operation.dragClean();
        console.log('TreeProvider.ssssssssssssssss', operation.tree);
        forceUpdate();
      });
    });
  });
  console.log('TreeProvider-1111', workspace?.operation.tree);

  return (
    <InsertionContenxt.Provider
      value={{
        closestDirection: workspace?.operation?.viewportDragon?.closestDirection,
        closestOffsetRect: workspace?.operation?.viewportDragon?.closestOffsetRect,
        closestRect: workspace?.operation?.viewportDragon?.closestRect,
        closestNode: workspace?.operation?.viewportDragon?.closestNode,
      }}
    >
      {children}
    </InsertionContenxt.Provider>
  );
};
function ViewportScrollEvent(ViewportScrollEvent: any, arg1: (event: any) => void) {
  throw new Error('Function not implemented.');
}
