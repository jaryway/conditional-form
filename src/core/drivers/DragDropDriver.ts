import { EventDriver } from '../../shared';
import { DragMoveEvent, DragStartEvent, DragStopEvent } from '../events';

const GlobalState = {
  dragging: false,
  onMouseDownAt: 0,
  startEvent: null as any,
  moveEvent: null as any,
};

function pauseEvent(e: any) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

class DragDropDriver extends EventDriver {
  batchAddEventListener = (type: keyof DocumentEventMap, listener: any, options?: any) => {
    document.addEventListener(type, listener, options);
  };

  batchRemoveEventListener = (type: keyof DocumentEventMap, listener: any, options?: any) => {
    document.removeEventListener(type, listener, options);
  };

  onMouseDown = (e: MouseEvent) => {
    // console.log('onMouseDown');
    if (e.button !== 0 || e.ctrlKey || e.metaKey) {
      return;
    }

    const target = e.target as HTMLElement;

    if (target?.['isContentEditable'] || target?.['contentEditable'] === 'true') {
      return true;
    }
    if (target?.['closest']?.('.monaco-editor')) return;
    GlobalState.startEvent = e;
    GlobalState.dragging = false;
    GlobalState.onMouseDownAt = Date.now();
    this.batchAddEventListener('mouseup', this.onMouseUp);
    this.batchAddEventListener('dragend', this.onMouseUp);
    this.batchAddEventListener('dragstart', this.onStartDrag);
    this.batchAddEventListener('mousemove', this.onDistanceChange);
  };

  onMouseUp = (e: MouseEvent) => {
    // console.log('onMouseUp');
    if (GlobalState.dragging) {
      // todo
      // this.dispatch?.({ type: 'drop:stop', payload: e });
      this.dispatch(
        new DragStopEvent({
          clientX: e.clientX,
          clientY: e.clientY,
          pageX: e.pageX,
          pageY: e.pageY,
          target: e.target,
          view: e.view,
        }),
      );
    }

    this.batchRemoveEventListener('mousedown', this.onMouseDown);
    this.batchRemoveEventListener('dragover', this.onMouseMove);
    this.batchRemoveEventListener('mousemove', this.onMouseMove);
    this.batchRemoveEventListener('mouseup', this.onMouseUp);
    this.batchRemoveEventListener('mousemove', this.onDistanceChange);
    GlobalState.dragging = false;
  };

  onStartDrag = (e: MouseEvent | DragEvent) => {
    // console.log('onStartDrag');
    // pauseEvent(e);
    if (GlobalState.dragging) return;
    GlobalState.startEvent = GlobalState.startEvent || e;
    this.batchAddEventListener('dragover', this.onMouseMove);
    this.batchAddEventListener('mousemove', this.onMouseMove);
    // this.batchAddEventListener('contextmenu', this.onContextMenuWhileDragging, true);
    // this.dispatch?.({ type: 'drop:start', payload: e });

    this.dispatch(
      new DragStartEvent({
        clientX: GlobalState.startEvent.clientX,
        clientY: GlobalState.startEvent.clientY,
        pageX: GlobalState.startEvent.pageX,
        pageY: GlobalState.startEvent.pageY,
        target: GlobalState.startEvent.target,
        view: GlobalState.startEvent.view,
      }),
    );
    GlobalState.dragging = true;
  };
  onDistanceChange = (e: MouseEvent) => {
    // console.log('onDistanceChange');
    const distance = Math.sqrt(
      Math.pow(e.pageX - GlobalState.startEvent.pageX, 2) +
        Math.pow(e.pageY - GlobalState.startEvent.pageY, 2),
    );
    const timeDelta = Date.now() - GlobalState.onMouseDownAt;
    if (timeDelta > 10 && e !== GlobalState.startEvent && distance > 4) {
      this.batchRemoveEventListener('mousemove', this.onDistanceChange);
      this.onStartDrag(e);
    }
  };
  onMouseMove = (e: MouseEvent | DragEvent) => {
    // console.log('onMouseMove');
    pauseEvent(e);
    if (
      e.clientX === GlobalState.moveEvent?.clientX &&
      e.clientY === GlobalState.moveEvent?.clientY
    )
      return;

    if (GlobalState.dragging) {
      // console.log('GlobalState.dragging', GlobalState.dragging);
    }
    // this.dispatch?.({ type: 'drop:move', payload: e });
    this.dispatch(
      new DragMoveEvent({
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        target: e.target,
        view: e.view,
      }),
    );

    GlobalState.moveEvent = e;
  };

  attach() {
    this.batchAddEventListener('mousedown', this.onMouseDown, true);
  }

  detach() {
    GlobalState.dragging = false;
    GlobalState.moveEvent = null;
    // GlobalState.onMouseDownAt = null;
    GlobalState.startEvent = null;
    this.batchRemoveEventListener('mousedown', this.onMouseDown, true);
    this.batchRemoveEventListener('dragstart', this.onStartDrag);
    this.batchRemoveEventListener('dragend', this.onMouseUp);
    this.batchRemoveEventListener('dragover', this.onMouseMove);
    this.batchRemoveEventListener('mouseup', this.onMouseUp);
    this.batchRemoveEventListener('mousemove', this.onMouseMove);
    this.batchRemoveEventListener('mousemove', this.onDistanceChange);
    // this.batchRemoveEventListener('contextmenu', this.onContextMenuWhileDragging, true);
  }
}

export default DragDropDriver;
