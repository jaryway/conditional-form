import { EventDriverContainer, ICustomEvent, IEventDriver } from './types';

/**
 * 事件驱动器基类
 */
export class EventDriver<Engine extends Event = Event, Context = any> implements IEventDriver {
  engine: Engine;

  container: EventDriverContainer = document;

  contentWindow: Window = window;

  context?: Context;

  constructor(engine: Engine, context?: Context) {
    this.engine = engine;
    this.context = context;
  }

  dispatch<T extends ICustomEvent<any> = any>(event: T) {
    return this.engine.dispatch(event, this.context);
  }

  subscribe<T extends ICustomEvent<any> = any>(subscriber: ISubscriber<T>) {
    return this.engine.subscribe(subscriber);
  }

  subscribeTo<T extends CustomEventClass>(type: T, subscriber: ISubscriber<InstanceType<T>>) {
    // console.log('subscribeTo1',type)
    return this.engine.subscribeTo(type, subscriber);
  }

  subscribeWith<T extends ICustomEvent = ICustomEvent>(
    type: string | string[],
    subscriber: ISubscriber<T>,
  ) {
    return this.subscribeWith(type, subscriber);
  }

  attach(container: EventDriverContainer) {
    console.error('attach must implement.');
  }

  detach(container: EventDriverContainer) {
    console.error('attach must implement.');
  }

  eventTarget(type: string) {
    // console.log('eventTarget', this.container)
    if (type === 'resize' || type === 'scroll') {
      if (this.container === this.contentWindow?.document) {
        return this.contentWindow;
      }
    }
    return this.container;
  }

  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventOptions,
  ): void;
  addEventListener(type: any, listener: any, options: any) {
    const target = this.eventTarget(type);
    if (options?.once) {
      target[EVENTS_ONCE_SYMBOL] = target[EVENTS_ONCE_SYMBOL] || {};
      delete options.once;
      if (!target[EVENTS_ONCE_SYMBOL][type]) {
        target.addEventListener(type, listener, options);
        target[EVENTS_ONCE_SYMBOL][type] = listener;
      }
    } else {
      target[EVENTS_SYMBOL] = target[EVENTS_SYMBOL] || {};
      target[EVENTS_SYMBOL][type] = target[EVENTS_SYMBOL][type] || new Map();
      if (!target[EVENTS_SYMBOL][type]?.get?.(listener)) {
        target.addEventListener(type, listener, options);
        target[EVENTS_SYMBOL][type]?.set?.(listener, true);
      }
    }
  }

  removeEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventOptions,
  ): void;
  removeEventListener(type: any, listener: any, options?: any) {
    const target = this.eventTarget(type);
    if (options?.once) {
      target[EVENTS_ONCE_SYMBOL] = target[EVENTS_ONCE_SYMBOL] || {};
      delete options.once;
      delete target[EVENTS_ONCE_SYMBOL][type];
      target.removeEventListener(type, listener, options);
    } else {
      target[EVENTS_SYMBOL] = target[EVENTS_SYMBOL] || {};
      target[EVENTS_SYMBOL][type] = target[EVENTS_SYMBOL][type] || new Map();
      target[EVENTS_SYMBOL][type]?.delete?.(listener);
      target.removeEventListener(type, listener, options);
    }
  }

  batchAddEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventOptions,
  ): void;
  batchAddEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventOptions,
  ): void;
  batchAddEventListener(type: any, listener: any, options?: any) {
    if (!env.ALL_EVENT_DRIVERS.includes(this)) {
      env.ALL_EVENT_DRIVERS.push(this);
    }
    env.ALL_EVENT_DRIVERS.forEach((driver) => {
      const target = driver.eventTarget(type);
      target[EVENTS_BATCH_SYMBOL] = target[EVENTS_BATCH_SYMBOL] || {};
      if (!target[EVENTS_BATCH_SYMBOL][type]) {
        target.addEventListener(type, listener, options);
        target[EVENTS_BATCH_SYMBOL][type] = listener;
      }
    });
  }

  batchRemoveEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventOptions,
  ): void;
  batchRemoveEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventOptions,
  ): void;
  batchRemoveEventListener(type: any, listener: any, options: any) {
    env.ALL_EVENT_DRIVERS.forEach((driver) => {
      const target = driver.eventTarget(type);
      target[EVENTS_BATCH_SYMBOL] = target[EVENTS_BATCH_SYMBOL] || {};
      target.removeEventListener(type, listener, options);
      delete target[EVENTS_BATCH_SYMBOL][type];
    });
  }
}
