

export const transitionEndEvent = (function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd otransitionend',
        'transition': 'transitionend'
    }

    for (var name in transEndEventNames) {
        if (el.style[name as any] !== undefined) {
            return (<any>transEndEventNames)[name] as any
        }
    }

    return null
})();

export const animationEndEvent = (function animationEnd() {
    const el = document.createElement('bootstrap');

    const transEndEventNames = {
        'WebkitAnimation': 'webkitAnimationEnd',
        'MozAnimation': 'animationend',
        'OAnimation': 'oAnimationEnd oanimationend',
        'animation': 'animationend'
    }

    for (var name in transEndEventNames) {
        if (el.style[name as any] !== undefined) {
            return (<any>transEndEventNames)[name]
        }
    }

    return null;

})();



function _t_end(event: string) {
    return function <T extends EventTarget>(elm: T, timeout: number = 2000) {
        return new Promise<any>((resolve, _) => {
            let h = false, t = setTimeout(() => {
                if (h) return;
                h = true;
                elm.removeEventListener(event, callback);
                resolve(null);
            }, timeout);
            const callback = function (e: Event) {
                if (h) return;
                h = true;
                clearTimeout(t);
                elm.removeEventListener(event, callback);
                resolve(e);
            };
            elm.addEventListener(event, callback);
        });
    }
}

export const transitionEnd = _t_end(transitionEndEvent);
export const animationEnd = _t_end(animationEndEvent);


export const requestAnimationFrame = (function () {
    var lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    return (window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : null) ||
        vendors.map(m => (window as any)[m + 'RequestAnimationFrame']).filter(m => m != null).pop() ||
        function (callback: any, _element: any) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
})();


export function delay(timeout: number = 0): PromiseLike<undefined> {
    return new Promise((res, _rej) => {
        setTimeout(res, timeout);
    });
}