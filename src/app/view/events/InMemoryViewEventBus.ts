import { ViewEvent } from './ViewEvent';
import { ViewEventBus } from './ViewEventBus';

type EventListener = { readonly eventType: string; readonly reaction: (event: ViewEvent) => void };

/**
 * Implementacja interfejsu ViewEventBus
 * Dzięki użyciu tej klasy np. inna klasa A może opublikować jakiś event (poinformować, że coś się u niej stało), np. że nastąpiło kliknięcie na przycisk.
 * Nie interesuje jej kto na to słucha i nie wywołuje bezpośrednio reakcji.
 * Klasa B może użyć funkcji listenOn aby nasłuchiwać na opublikowanie zdarzenie. Kiedy ktoś wywoła publish(TypZdarzenia),
 * zostaną wywołane wszystkie funkcje, które zostały przekazane jako parametr reaction metody listenOn, jeśli typ zdarzenia jest zgodny z oczekiwanym.
 */
export class InMemoryViewEventBus implements ViewEventBus {
  private readonly listeners: EventListener[] = [];

  publish(event: ViewEvent): void {
    this.listeners.filter((it) => it.eventType === event.eventType).forEach((it) => it.reaction(event));
  }

  listenOn<EventType extends ViewEvent>(eventType: EventType['eventType'], reaction: (event: EventType) => void): void {
    this.listeners.push({ eventType, reaction: reaction as (event: ViewEvent) => void });
  }
}
