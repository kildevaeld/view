import { global } from '@viewjs/di';

/**
 * Mark a property to lazy injected by the di-container,
 * @param target 
 * @param key 
 * @param descriptor 
 * @example
 *  class SomeComponent extends Component {
 *      @inject
 *      service: Service
 * 
 *      render() {
 *          return <div>{this.service.getAll()}</div>
 *      }
 *  }
 */
export function injectProp(target: any, key: string, descriptor?: PropertyDescriptor): any {
    let Dependency = Reflect.getOwnMetadata("design:type", target, key);
    if (!Dependency) throw new Error('design:type metadata does not exists on property. consider compiling ts with "emitDecoratorMetadata" enabled or add design:type metadata manually');

    // In IE11 calling Object.defineProperty has a side-effect of evaluating the
    // getter for the property which is being replaced. This causes infinite
    // recursion and an "Out of stack space" error.
    let definingProperty = false;

    return {
        configurable: true,
        get: function () {
            if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
                return descriptor;
            }
            // Cache the dependency resolution as we don't want transient values
            // to keep being instantiated on property access.

            const instance = global().get(Dependency);
            definingProperty = true;
            Object.defineProperty(this, key, {
                get() {
                    return instance;
                }
            });
            definingProperty = false;
            return instance;
        },
    }

}

