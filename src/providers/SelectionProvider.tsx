import React, { FC, useState, createContext, useEffect } from 'react';
import { MouseClickEvent } from '../core/events';
import { CursorStatus, Selection } from '../core/models';
import { useDesigner, useForceUpdate } from '../hooks';
import { Point } from '../shared';

export const SelectionContext = createContext<Selection>({} as any);

export const SelectionProvider: FC<any> = ({ children }) => {
  const engine = useDesigner();
  const forceUpdate = useForceUpdate();
  const [selection, setSelection] = useState<Selection>();
  

  useEffect(() => {
    engine.subscribeTo(MouseClickEvent, (event) => {
      // console.log('CursorStatus.Selection', engine.cursor.status);
      if (engine.cursor.status !== CursorStatus.Normal) return;
      const target: HTMLElement = event.data.target as any;
      const el = target?.closest?.(`
        *[${engine.props.nodeIdAttrName}],
        *[${engine.props.outlineNodeIdAttrName}]
      `);
      const isHelpers = target?.closest?.(`*[${engine.props.nodeHelpersIdAttrName}]`);
      const currentWorkspace = event?.context?.workspace;

      if (!currentWorkspace) return;
      if (!el?.getAttribute) {
        const point = new Point(event.data.topClientX, event.data.topClientY);
        const operation = currentWorkspace.operation;
        const viewport = currentWorkspace.viewport;
        const outline = currentWorkspace.outline;
        const isInViewport = viewport.isPointInViewport(point, false);
        const isInOutline = outline.isPointInViewport(point, false);
        if (isHelpers) return;
        if (isInViewport || isInOutline) {
          const selection = operation.selection;
          const tree = operation.tree;
          selection.select(tree);
          setSelection(Object.assign({}, selection));
        }
        return;
      }
      const nodeId = el.getAttribute(engine.props.nodeIdAttrName);
      const structNodeId = el.getAttribute(engine.props.outlineNodeIdAttrName);
      const operation = currentWorkspace.operation;
      const selection = operation.selection;
      const tree = operation.tree;
      const node = tree.findById(nodeId || structNodeId);
      if (node) {
        // engine.keyboard.requestClean();
        // if (engine.keyboard.isKeyDown(KeyCode.Meta) || engine.keyboard.isKeyDown(KeyCode.Control)) {
        //   if (selection.has(node)) {
        //     if (selection.selected.length > 1) {
        //       selection.remove(node);
        //     }
        //   } else {
        //     selection.add(node);
        //   }
        // } else if (engine.keyboard.isKeyDown(KeyCode.Shift)) {
        //   if (selection.has(node)) {
        //     if (selection.selected.length > 1) {
        //       selection.remove(node);
        //     }
        //   } else {
        //     selection.crossAddTo(node);
        //   }
        // } else {
        if (operation.focusNode !== node) {
          operation.focusClean();
        }
        selection.select(node);
        // }
      } else {
        selection.select(tree);
      }
      setSelection(Object.assign({}, selection));
      // setSelected(selection.selected);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('selection', selection);

  return (
    <SelectionContext.Provider value={new Selection({ ...selection })}>
      {children}
    </SelectionContext.Provider>
  );
};
