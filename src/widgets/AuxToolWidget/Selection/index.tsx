import React, { FC, Fragment } from 'react';
// import { Helpers } from './Helpers';
import {
  useSelection,
  //   useValidNodeOffsetRect,
  //   useTree,
  useCursorStatus,
  //   useDragon,
  usePrefix,
  useTree,
} from '../../../hooks';
import { TreeNode } from '../../../core/models';
import { useDesigner } from '../../../hooks';
export interface ISelectionBoxProps {
  node: TreeNode;
  showHelpers: boolean;
}

export const SelectionBox: React.FC<ISelectionBoxProps> = (props) => {
  const prefix = usePrefix('aux-selection-box');
  //   const nodeRect = useValidNodeOffsetRect(props.node);
  const createSelectionStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      boxSizing: 'border-box',
    };
    // if (nodeRect) {
    //   baseStyle.transform = `perspective(1px) translate3d(${nodeRect.x}px,${nodeRect.y}px,0)`;
    //   baseStyle.height = nodeRect.height;
    //   baseStyle.width = nodeRect.width;
    // }
    return baseStyle;
  };
  //   if (!nodeRect) return null;

  //   if (!nodeRect.width || !nodeRect.height) return null;

  return (
    <div className={prefix} style={createSelectionStyle()}>
      selection
      {/* {props.showHelpers && <Helpers {...props} node={props.node} nodeRect={nodeRect} />} */}
    </div>
  );
};

export const Selection: FC<any> = () => {
  const designer = useDesigner();

  const selection = useSelection();
  const tree = useTree("Selection");
  const status = useCursorStatus();
  console.log('useTree-Selection', tree);
  //   const viewportDragon = useDragon();
  if (status !== 'NORMAL') return null;
  return (
    <Fragment>
      {selection.selected.map((id) => {
        // const node = tree?.findById(id);
        // console.log('xxxxxxxxxxxxxxxxxx', node);
        // if (!node) return null;
        // if (node.hidden) return null;
        return (
          <SelectionBox key={id} node={{} as any} showHelpers={selection.selected.length === 1} />
        );
      })}
    </Fragment>
  );
};

Selection.displayName = 'Selection';
