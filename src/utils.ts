// eslint-disable-next-line no-unused-vars
export function listenWindow<K extends keyof WindowEventMap>(event: K, handler: (e: WindowEventMap[K]) => void) {
    window.addEventListener(event, handler);
    
    return () => {
        window.removeEventListener<K>(event, handler);
    }
}

export function listenEvent<K extends keyof HTMLElementEventMap>(el: HTMLElement, event: K, handler: (e: HTMLElementEventMap[K]) => void) {
    el.addEventListener(event, handler);
    
    return () => {
        el.removeEventListener<K>(event, handler);
    }
}