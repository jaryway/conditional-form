import React, { createContext, FC, useContext, useEffect } from 'react';
import { useCursorPosition, useDesigner, useDragon, usePrefix } from '../../hooks';
import { ClosestDirection } from '../../core/models';
import { AddWorkspaceEvent } from '../../core/events';
import { InsertionContenxt, InsertionProvider } from '../../providers/InsertionProvider';
// import { observer } from '@formily/reactive-react';

export const Insertion: FC<any> = () => {
  return (
    <InsertionProvider>
      <InternalInsertion />
    </InsertionProvider>
  );
};

export const InternalInsertion = () => {
  const designer = useDesigner();
  // const s = useCursorPosition();

  const viewportDragon = useContext(InsertionContenxt);
  const prefix = usePrefix('aux-insertion');

  useEffect(() => {
    // designer.subscribeTo(AddWorkspaceEvent, () => {
    //   console.log('Insertion.subscribeTo');
    // });
  }, []);

  console.log('Insertion', viewportDragon);

  const createInsertionStyle = (): React.CSSProperties => {
    const closestDirection = viewportDragon.closestDirection;
    const closestRect = viewportDragon.closestOffsetRect;
    const closestNode = viewportDragon.closestNode;
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      transform: 'perspective(1px) translate3d(0,0,0)',
      top: 0,
      left: 0,
    };
    if (!closestRect) return baseStyle;
    if (
      closestDirection === ClosestDirection.Before ||
      closestDirection === ClosestDirection.ForbidBefore
    ) {
      baseStyle.width = 2;
      baseStyle.height = closestRect.height;
      baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
    } else if (
      closestDirection === ClosestDirection.After ||
      closestDirection === ClosestDirection.ForbidAfter
    ) {
      baseStyle.width = 2;
      baseStyle.height = closestRect.height;
      baseStyle.transform = `perspective(1px) translate3d(${
        closestRect.x + closestRect.width - 2
      }px,${closestRect.y}px,0)`;
    } else if (
      closestDirection === ClosestDirection.InnerAfter ||
      closestDirection === ClosestDirection.Under ||
      closestDirection === ClosestDirection.ForbidInnerAfter ||
      closestDirection === ClosestDirection.ForbidUnder
    ) {
      if (closestNode?.designerProps?.inlineLayout === true) {
        baseStyle.width = 2;
        baseStyle.height = closestRect.height;
        baseStyle.transform = `perspective(1px) translate3d(${
          closestRect.x + closestRect.width - 2
        }px,${closestRect.y}px,0)`;
      } else {
        baseStyle.width = closestRect.width;
        baseStyle.height = 2;
        baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${
          closestRect.y + closestRect.height - 2
        }px,0)`;
      }
    } else if (
      closestDirection === ClosestDirection.InnerBefore ||
      closestDirection === ClosestDirection.Upper ||
      closestDirection === ClosestDirection.ForbidInnerBefore ||
      closestDirection === ClosestDirection.ForbidUpper
    ) {
      if (closestNode?.designerProps?.inlineLayout === true) {
        baseStyle.width = 2;
        baseStyle.height = closestRect.height;
        baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
      } else {
        baseStyle.width = closestRect.width;
        baseStyle.height = 2;
        baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
      }
    }
    if (closestDirection.includes('FORBID')) {
      baseStyle.backgroundColor = 'red';
    }
    return baseStyle;
  };

  return <div className={prefix} style={createInsertionStyle()}></div>;
};

Insertion.displayName = 'Insertion';
