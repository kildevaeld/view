// import { IView } from './types';
// import { getOption, Constructor } from '@viewjs/utils';

// export interface IViewElement {
//     /**
//      * Tagname of element. This should be set with @attributes decorator
//      * 
//      * @type {string}
//      * @memberof IViewElement
//      */
//     tagName?: string;
//     /**
//      * This should be set with the @attributes decorator
//      * 
//      * @type {string}
//      * @memberof IViewElement
//      */
//     className?: string;
//     attributes?: { [key: string]: string };

//     /**
//      * Remove element from dom
//      * 
//      * @returns {this} 
//      * 
//      * @memberof IViewElement
//      */
//     remove(): this;

// }


// export function withElement<T extends Constructor<IView>>(Base: T): Constructor<IViewElement> & T {
//     return class extends Base {
//         private __created: boolean;
//         options?: any;
//         constructor(...args: any[]) {
//             super(...args);
//             this.__created = false;
//             if (!this.el) this._ensureElement();
//         }

//         protected _ensureElement() {
//             if (this.el) return;
//             const tagName = getOption<string>('tagName', [this.options, this]) || 'div',
//                 className = getOption<string>('className', [this.options, this]),
//                 attr = getOption<{ [key: string]: string }>('attributes', [this.options, this]),
//                 el = document.createElement(tagName);

//             if (className) {
//                 // IE < 11 does not support multiple arguments in add/remove
//                 className.split(' ').map(m => m.trim())
//                     .forEach(cl => el.classList.add(cl))
//             }
//             if (attr) {
//                 for (let key in attr) {
//                     el.setAttribute(key, attr[key]);
//                 }
//             }

//             this.__created = true;
//             this.el = el;
//         }

//         remove() {
//             if (this.__created && this.el && this.el!.parentNode) {
//                 if (typeof (this as any).undelegateEvents === 'function')
//                     (this as any).undelegateEvents();
//                 this.el!.parentNode!.removeChild(this.el);
//                 this.el = void 0;
//             }
//             this.__created = false;
//             return this;
//         }

//         destroy() {
//             super.destroy();
//             this.remove();
//             return this;
//         }
//     }
// }
