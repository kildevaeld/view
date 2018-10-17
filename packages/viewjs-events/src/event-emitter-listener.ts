import { EventEmitter } from './event-emitter';
import { withEventListener } from './event-listener';
import { IEventEmitter, IEventListener } from './types';
import { Constructor } from '@viewjs/utils';

export class EventEmitterListener extends withEventListener<Constructor<EventEmitter>>(EventEmitter) implements IEventEmitter, IEventListener { }