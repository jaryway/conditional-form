// import { EventDriver } from '@designable/shared'
// import { Engine } from '../models/Engine'
// import { MouseMoveEvent } from '../events'
import { EventDriver } from '../../shared';
import { MouseMoveEvent } from '../events';

const obj = {
  time: 0,
};
setInterval(() => {
  obj.time = obj.time === 0 ? 1 : 0;
}, 500);

export class MouseMoveDriver extends EventDriver {
  request = null;

  onMouseMove = (e: MouseEvent) => {
    this.request = requestAnimationFrame(() => {
      cancelAnimationFrame(this.request);
      if (obj.time === 0) console.log('mount-mousemove', this.context);
      this.dispatch(
        new MouseMoveEvent({
          clientX: e.clientX,
          clientY: e.clientY,
          pageX: e.pageX,
          pageY: e.pageY,
          target: e.target,
          view: e.view,
        }),
      );
    });
  };

  attach() {
    this.addEventListener('mousemove', this.onMouseMove, {
      once: true,
    });
  }

  detach() {
    this.removeEventListener('mouseover', this.onMouseMove, {
      once: true,
    });
  }
}
