import React, { FC, Fragment } from 'react';
// import { Helpers } from './Helpers';
import {
  useSelection,
  useCursorStatus,
  usePrefix,
  useTree,
  useValidNodeOffsetRect,
  useDesigner,
} from '../../../hooks';
import { CursorStatus, TreeNode } from '../../../core/models';
// import { useDesigner } from '../../../hooks';
export interface ISelectionBoxProps {
  node: TreeNode;
  showHelpers: boolean;
}

export const SelectionBox: React.FC<ISelectionBoxProps> = (props) => {
  const prefix = usePrefix('aux-selection-box');
  const designer = useDesigner();
  const nodeRect = useValidNodeOffsetRect(props.node);
  const createSelectionStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      boxSizing: 'border-box',
    };
    if (nodeRect) {
      baseStyle.transform = `perspective(1px) translate3d(${nodeRect.x}px,${nodeRect.y}px,0)`;
      baseStyle.height = nodeRect.height;
      baseStyle.width = nodeRect.width;
    }
    return baseStyle;
  };
  if (!nodeRect) return null;

  if (!nodeRect.width || !nodeRect.height) return null;

  return (
    <div
      className={prefix}
      style={createSelectionStyle()}
      {...{ [designer.props?.nodeHelpersIdAttrName]: 'xxx' }}
    >
      selection
      {/* {props.showHelpers && <Helpers {...props} node={props.node} nodeRect={nodeRect} />} */}
    </div>
  );
};

export const Selection: FC<any> = () => {
  const selection = useSelection();
  const tree = useTree();
  const status = useCursorStatus();

  console.log('selection-render', selection.selected);

  // const viewportDragon = useDragon();
  if (status !== CursorStatus.Normal) return null;

  return (
    <Fragment>
      {selection.selected.map((id) => {
        const node = tree?.findById?.(id);
        console.log('xxxxxxxxxxxxxxxxxx', node);
        if (!node) return null;
        if (node.hidden) return null;
        return <SelectionBox key={id} node={node} showHelpers={selection.selected.length === 1} />;
      })}
    </Fragment>
  );
};

Selection.displayName = 'Selection';
