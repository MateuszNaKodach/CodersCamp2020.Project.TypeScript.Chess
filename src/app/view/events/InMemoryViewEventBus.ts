import { ViewEvent } from './ViewEvent';
import { ViewEventBus } from './ViewEventBus';

type EventListener = { readonly eventType: string; readonly reaction: (event: ViewEvent) => void };

export class InMemoryViewEventBus implements ViewEventBus {
  private readonly listeners: EventListener[] = [];

  publish(event: ViewEvent): void {
    this.listeners.filter((it) => it.eventType === event.eventType).forEach((it) => it.reaction(event));
  }

  listenOn<EventType extends ViewEvent>(eventType: EventType['eventType'], reaction: (event: EventType) => void): void {
    this.listeners.push({ eventType, reaction: reaction as (event: ViewEvent) => void });
  }
}
