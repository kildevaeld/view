import { IView } from '@viewjs/view';
import { Constructor, Condition } from '@viewjs/types';
import { IComponentView, AttachOptions } from './types';
import { Resolvable } from './resolver';
import { Invoker, isString } from '@viewjs/utils'

const ComponentsKey = Symbol('view@attachments');

export interface DecoratorAttachOptions {
    view?: Resolvable<IView>
    optional?: boolean;
    selector?: string;
    name?: string;
    condition?: Condition<IView>
}

export function attach(selector: string | DecoratorAttachOptions, options?: DecoratorAttachOptions) {
    return function <T extends IComponentView>(target: T, prop: string) {

        if (!isString(selector)) {
            options = selector;
        } else {
            (options || (options = {}))!.selector = selector;
        }

        options = Object.assign({
            name: prop
        }, options);

        if (!options.view) {
            const Type = Reflect.getOwnMetadata("design:type", target, prop);
            if (Type) options.view = () => Invoker.get(Type);
        }

        if (!options.view) throw new Error(`design:type does not exists for prop '${prop}' on '${target}'`);

        let meta = Reflect.getOwnMetadata(ComponentsKey, target);
        if (!meta) {
            meta = [];
            Reflect.defineMetadata(ComponentsKey, meta, target);
        }

        meta.push(options);


        return {
            get: function (this: T) {
                const found = this.attachView(prop);
                return found ? found.getInstance() : void 0;
            }
        } as any;
    }
}

export type AttachmentsOptions = { [key: string]: AttachOptions }

export function attachments(options: AttachmentsOptions) {
    return function <T extends IComponentView>(target: Constructor<T>) {

        let meta = Reflect.getOwnMetadata(ComponentsKey, target.prototype);
        if (!meta) {
            meta = [];
            Reflect.defineMetadata(ComponentsKey, meta, target.prototype);
        }

        for (let k in options) {
            var v = options[k];
            meta.push(Object.assign({ name: k }, v));
        }

    }
}


export function componentFromMeta(view: IView): AttachOptions[] {
    let out = Reflect.getMetadata(ComponentsKey, view);
    return out || [];
}
