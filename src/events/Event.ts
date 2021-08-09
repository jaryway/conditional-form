import { isArr } from '@formily/shared';
import { ICustomEvent, ISubscriber, Subscrible } from './subscrible';
import { CustomEventClass, EventContainer, IEventDriverClass, IEventProps } from './types';

/**
 * 事件引擎
 */
export class Event extends Subscrible<ICustomEvent<any>> {
  private drivers: IEventDriverClass<any>[] = [];
  private containers: EventContainer[] = [];
  constructor(props?: IEventProps) {
    super();
    const that = this;
    if (props && isArr(props?.effects)) {
      props.effects.forEach((plugin) => plugin(that as any));
    }
    if (isArr(props?.drivers)) {
      this.drivers = props?.drivers || [];
    }
  }

  subscribeTo<T extends CustomEventClass>(type: T, subscriber: ISubscriber<InstanceType<T>>) {
    return this.subscribe((event) => {
      if (type && event instanceof type) {
        return subscriber(event);
      }
    });
  }

  subscribeWith<T extends ICustomEvent = ICustomEvent>(
    type: string | string[],
    subscriber: ISubscriber<T>,
  ) {
    return this.subscribe((event) => {
      if (isArr(type)) {
        if (type.includes(event?.type)) {
          return subscriber(event);
        }
      } else {
        if (type && event?.type === type) {
          return subscriber(event);
        }
      }
    });
  }

  attachEvents(container: EventContainer, contentWindow: Window = window, context?: any) {
    if (!container) return;
    if (Object.prototype.toString.call(container) === `[object Window]`) {
      return this.attachEvents(container.document, container, context);
    }
    if (container[ATTACHED_SYMBOL]) return;
    this.drivers.map((EventDriver) => {
      const driver = new EventDriver(this, context);
      driver.contentWindow = contentWindow;
      driver.container = container;
      driver.attach(container);
      return driver;
    });
    container[ATTACHED_SYMBOL] = true;
    if (!this.containers.includes(container)) {
      this.containers.push(container);
    }
  }

  detachEvents(container?: EventContainer) {
    if (!container) {
      this.containers.forEach((container) => {
        this.detachEvents(container);
      });
      return;
    }
    if (container instanceof Window) {
      return this.detachEvents(container.document);
    }
    if (!container[ATTACHED_SYMBOL]) return;
    env.ALL_EVENT_DRIVERS = env.ALL_EVENT_DRIVERS.reduce((drivers, driver) => {
      if (driver.container === container) {
        driver.detach(container);
        return drivers;
      }
      return drivers.concat(driver);
    }, []);
    this.containers = this.containers.filter((item) => item !== container);
    delete container[ATTACHED_SYMBOL];
    delete container[EVENTS_SYMBOL];
    delete container[EVENTS_ONCE_SYMBOL];
    delete container[EVENTS_BATCH_SYMBOL];
  }

  destroy() {
    this.detachEvents();
    this.unsubscribe();
  }
}
