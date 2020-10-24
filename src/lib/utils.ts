// eslint-disable-next-line no-unused-vars
export function listenWindow<K extends keyof WindowEventMap>(event: K, handler: (e: WindowEventMap[K]) => void): () => void {
    window.addEventListener(event, handler);
    
    return () => {
        window.removeEventListener<K>(event, handler);
    }
}

// eslint-disable-next-line no-unused-vars
export function listenEvent<K extends keyof HTMLElementEventMap>(el: HTMLElement, event: K, handler: (e: HTMLElementEventMap[K]) => void): () => void {
    el.addEventListener(event, handler);
    
    return () => {
        el.removeEventListener<K>(event, handler);
    }
}

export function uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
