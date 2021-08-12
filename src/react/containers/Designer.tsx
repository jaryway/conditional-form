import React, { useEffect } from 'react';
import cls from 'classnames';
import { DesignerProvider } from '../../providers';

import { GhostWidget } from '../../widgets/GhostWidget';
import { useDesigner } from '../../hooks';

export const Designer: React.FC<any> = (props) => {
  const engine = useDesigner();

  useEffect(() => {
    if (props.engine) {
      console.log('mount-engine');
      props.engine.mount();
    }
    return () => {
      if (props.engine) {
        props.engine.unmount();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (engine) throw new Error('There can only be one Designable Engine Context in the React Tree');

  return (
    <div
      className={cls({
        [`${props.prefixCls}app`]: true,
        [`${props.prefixCls}${props.theme}`]: props.theme,
      })}
    >
      <DesignerProvider
        {...{
          engine: props.engine,
          prefixCls: props.prefixCls,
          // theme: props.theme,
        }}
      >
        {/* {console.log('xxxxxxxxxxxx')} */}
        {props.children}
        <GhostWidget />
      </DesignerProvider>
    </div>
  );
};

Designer.defaultProps = {
  prefixCls: 'dn-',
  theme: 'light',
};
