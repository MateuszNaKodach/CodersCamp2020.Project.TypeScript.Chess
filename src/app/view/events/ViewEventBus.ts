import { ViewEvent } from './ViewEvent';

export interface ViewEventSource {
  listenOn<EventType extends ViewEvent>(eventType: EventType['eventType'], reaction: (event: EventType) => void): void;
}

export interface ViewEventPublisher {
  publish(event: ViewEvent): void;
}

export interface ViewEventBus extends ViewEventSource, ViewEventPublisher {}
