import type Evented from '@ember/object/evented';
import type Mixin from '@ember/object/mixin';

type EventMap = {
  [key: string]: (...args: any[]) => void;
};

export interface TypedEvented<TEvents extends EventMap> {
  has<TEvent extends keyof TEvents>(name: TEvent): boolean;

  off<TEvent extends keyof TEvents>(event: TEvent, method: TEvents[TEvent]): this;
  off<TEvent extends keyof TEvents>(event: TEvent, target: unknown, method: TEvents[TEvent]): this;

  on<TEvent extends keyof TEvents>(name: TEvent, method: TEvents[TEvent]): this;
  on<TEvent extends keyof TEvents>(name: TEvent, target: unknown, method: TEvents[TEvent]): this;

  one<TEvent extends keyof TEvents>(name: TEvent, method: TEvents[TEvent]): this;
  one<TEvent extends keyof TEvents>(name: TEvent, target: unknown, method: TEvents[TEvent]): this;

  trigger<TEvent extends keyof TEvents>(name: TEvent, ...args: Parameters<TEvents[TEvent]>): void;
}

export function createTypedEvented<TEvents extends EventMap = never>(evented: typeof Evented) {
  return evented as Mixin<TypedEvented<TEvents>>;
}
