// import { EventDriver } from '@designable/shared'
// import { Engine } from '../models/Engine'
// import { MouseMoveEvent } from '../events'
import { EventDriver } from '../../shared';
import { MouseClickEvent } from '../events';

export class MouseMoveDriver extends EventDriver {
  onMouseClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target?.closest('*[data-click-stop-propagation]')) {
      return;
    }

    this.dispatch(
      new MouseClickEvent({
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        target: e.target,
        view: e.view,
      }),
    );
  };

  attach() {
    this.addEventListener('click', this.onMouseClick, {
      once: true, //防止对同一个container注册多次click
    });
  }

  detach() {
    this.removeEventListener('click', this.onMouseClick, {
      once: true,
    });
  }
}
