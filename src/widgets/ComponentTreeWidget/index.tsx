import React, { Fragment, useEffect, useContext, createContext } from 'react';
import { useTree, usePrefix, useDesigner, useRegistry } from '../../hooks';
import { TreeNodeContext } from '../../context';
import { TreeNode } from '../../core//models';
import cls from 'classnames';
import './styles.less';
// import { TreeContext } from '../../providers';

const ComponentsContext = createContext<IComponents>({});
export interface IComponents {
  [key: string]: React.JSXElementConstructor<any>;
}

export interface IComponentTreeWidgetProps {
  style?: React.CSSProperties;
  className?: string;
  components: IComponents;
}

export interface ITreeNodeWidgetProps {
  node: TreeNode;
  children?: React.ReactChild;
}

export const TreeNodeWidget: React.FC<ITreeNodeWidgetProps> = (props: ITreeNodeWidgetProps) => {
  const designer = useDesigner();
  const components = useContext(ComponentsContext);
  const node = props.node;

  const renderChildren = () => {
    if (node?.designerProps?.selfRenderChildren) return [];
    return node?.children?.map((child) => {
      // console.log('renderChildren', child);

      return <TreeNodeWidget key={child.id} node={child} />;
    });
  };

  const renderProps = (extendsProps: any = {}) => {
    if (node?.designerProps?.getComponentProps) {
      return {
        ...extendsProps,
        ...node.designerProps.getComponentProps(node),
      };
    }
    return { ...extendsProps, ...node.props };
  };

  const renderComponent = () => {
    const componentName = node.componentName;
    const Component = components[componentName];
    const dataId = {};
    if (Component) {
      if (designer) {
        dataId[designer?.props?.nodeIdAttrName] = node.id;
      }

      return React.createElement(Component, renderProps(dataId), ...renderChildren());
    } else {
      if (node?.children?.length) {
        return <Fragment>{renderChildren()}</Fragment>;
      }
    }
  };

  if (!node) return null;
  if (node.hidden) return null;
  return React.createElement(TreeNodeContext.Provider, { value: node }, renderComponent());
};

export const ComponentTreeWidget: React.FC<IComponentTreeWidgetProps> = (props) => {
  const tree = useTree();
  const prefix = usePrefix('component-tree');
  const designer = useDesigner();
  const registry = useRegistry();
  const dataId = {};

  // console.log('mount-ComponentTreeWidget-render', tree);

  useEffect(() => {
    if (designer) {
      Object.entries(props.components).forEach(([componentName, component]) => {
        if (component['designerProps']) {
          registry.setComponentDesignerProps(componentName, component['designerProps']);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (designer) {
    dataId[designer?.props?.nodeIdAttrName] = tree?.id;
  }
  return (
    <div
      style={props.style}
      className={cls(prefix, props.className)}
      {...dataId}
      // data-xxxxxxxxxxxxxxxx={4}
    >
      <ComponentsContext.Provider value={props.components}>
        <TreeNodeWidget node={tree} />
      </ComponentsContext.Provider>
    </div>
  );
};

ComponentTreeWidget.displayName = 'ComponentTreeWidget';
