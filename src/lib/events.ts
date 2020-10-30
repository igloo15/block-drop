/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISubscription {
    unsubscribe(): void;
}

export interface IEvent {
    subscribe(callback: () => void) : ISubscription;
}

export interface IEventOne<T> {
    subscribe(callback: (v: T) => void) : ISubscription;
}

export interface IEventTwo<T, K> {
    subscribe(callback: (v: T, t: K) => void) : ISubscription;
}

class BaseEvent {
    private _handlers: any[] = [];

    protected addHandler(callback: any): ISubscription {
        this._handlers.push(callback);
        return {
            unsubscribe: () => {
                this.unsubscribe(callback);
            }
        }
    }

    protected baseNext(...args: any[]) {
        this._handlers.forEach((c) => {
            c(...args);
        });
    }

    protected baseNextAsync(...args: any[]) : Promise<undefined[]> {
        const promises = this._handlers.map((c) => {
            return new Promise<undefined>((resolve, reject) => {
                try {
                    c(...args);
                    resolve();
                } catch (error) {
                    reject();
                }
            });
        });
        return Promise.all(promises);
    }

    private unsubscribe(callback: any) {
        if (!callback) return;

        for (let i = 0; i < this._handlers.length; i++) {
          if (this._handlers[i] == callback) {
            this._handlers.splice(i, 1);
            break;
          }
        }
    }
}

export class TypedEvent extends BaseEvent implements IEvent {
    /**
     * Construct a basic event with no arguments
     */
    constructor() {
        super();
    }

    subscribe(callback: () => void): ISubscription {
        return this.addHandler(callback);
    }

    next(): void {
        this.baseNext();
    }

    async nextAsync(): Promise<void> {
        await this.baseNextAsync();
    }

    asEvent() : IEvent {
        return this;
    }
}

export class TypedEventOne<T> extends BaseEvent implements IEventOne<T> {
    /**
     * Construct a TypedEvent with one argument
     */
    constructor() {
        super();
    }

    subscribe(callback: (v: T) => void): ISubscription {
        return this.addHandler(callback);
    }

    next(v: T): void {
        this.baseNext(v);
    }

    async nextAsync(v: T): Promise<void> {
        await this.baseNextAsync(v);
    }

    asEvent() : IEventOne<T> {
        return this;
    }
}

export class TypedEventTwo<T, K> extends BaseEvent implements IEventTwo<T, K> {
    /**
     * Construct a TypedEvent with two arguments
     */
    constructor() {
        super();
    }

    subscribe(callback: (v: T, t: K) => void): ISubscription {
        return this.addHandler(callback);
    }

    next(v: T, t: K): void {
        this.baseNext(v, t);
    }

    async nextAsync(v: T, t: K): Promise<void> {
        await this.baseNextAsync(v, t);
    }

    asEvent() : IEventTwo<T, K> {
        return this;
    }
}

interface IHTMLEventHandler {
    id: string;
    handler: (e: unknown) => void;
}

class HTMLEventGroup {
    private _handlers: IHTMLEventHandler[] = [];
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    addHandler(id: string, handler: (e: any) => void): () => void {
        this._handlers.push({id, handler});

        return () => {
            for (let i = 0; i < this._handlers.length; i++) {
                if (id === this._handlers[i].id) {
                    this._handlers.splice(i, 1);
                }
            }
        };
    }

    process(e: any): void {
        this._handlers.forEach(evtHandler => {
            if (e.target.matches(evtHandler.id)) {
                evtHandler.handler(e);
            }
        });
    }
}

export class HTMLEventManager {
    private _el: HTMLElement;
    private _eventMap: HTMLEventGroup[] = [];

    constructor(el: HTMLElement) {
        this._el = el;
    }

    private findEvent(id: string): HTMLEventGroup | undefined {
        return this._eventMap.find(v => v.name === id);
    }

    public addListener<K extends keyof HTMLElementEventMap>(id: string, event: K, handler: (e: HTMLElementEventMap[K]) => void): () => void {
        let eventGroup = this.findEvent(event);
        if (!eventGroup) {
            eventGroup = new HTMLEventGroup(event);
            this._eventMap.push(eventGroup);
            this._el.addEventListener(event, (e: any) => {
                const foundGroup = this.findEvent(event);
                if (foundGroup) {
                    foundGroup.process(e);
                }
            });
        }
        return eventGroup.addHandler(id, handler);
    }
}