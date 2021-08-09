// import { isFn } from './types'

import { isFn } from '@formily/shared';

const UNSUBSCRIBE_ID_SYMBOL = Symbol('UNSUBSCRIBE_ID_SYMBOL');

export interface ICustomEvent<EventData = any, EventContext = any> {
  type: string;
  data?: EventData;
  context?: EventContext;
}

export interface ISubscriber<Payload = any> {
  (payload: Payload): void | boolean;
}

export class Subscrible<ExtendsType = any> {
  private subscribers: {
    index: number;
    [key: number]: ISubscriber;
  } = {
    index: 0,
  };

  dispatch<T extends ExtendsType = any>(event: T, context?: any) {
    let interrupted = false;
    for (const key in this.subscribers) {
      if (isFn(this.subscribers[key])) {
        (event as any)['context'] = context;
        if (this.subscribers[key](event) === false) {
          interrupted = true;
        }
      }
    }
    return interrupted ? false : true;
  }

  // subscribeTo(type: string, subscriber: ISubscriber) {
  //   // const [subscriber, type] = args.reverse();
  //   // const subscriber = (args.length > 1 ? args[1] : args[0]) as ISubscriber;
  //   // const type = args.length > 1 ? args[0] : undefined;

  //   return this.subscribe((event) => {
  //     // console.log('subscribeTo', type, event)
  //     if (type && event.type === type) {
  //       return subscriber(event);
  //     }
  //   });
  // }

  subscribe(subscriber: ISubscriber) {
    let id: number = 0;
    if (isFn(subscriber)) {
      id = this.subscribers.index + 1;
      this.subscribers[id] = subscriber;
      this.subscribers.index++;
    }

    const unsubscribe = (() => {
      this.unsubscribe(id);
    }) as (() => any) & { [UNSUBSCRIBE_ID_SYMBOL]: any };

    unsubscribe[UNSUBSCRIBE_ID_SYMBOL] = id;

    return unsubscribe;
  }

  unsubscribe = (id?: number | string | (() => void)) => {
    if (id === undefined || id === null) {
      for (const key in this.subscribers) {
        this.unsubscribe(key);
      }
      return;
    }
    if (!isFn(id)) {
      delete this.subscribers[id as number];
    } else {
      delete this.subscribers[(id as any)[UNSUBSCRIBE_ID_SYMBOL]];
    }
  };
}
