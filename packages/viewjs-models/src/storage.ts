import { Model } from './model';

export type Attributes = { [key: string]: any };

export type MetaData = Attributes;

export interface Storage {
    save(model: Model, meta?: MetaData): Promise<Attributes>;
    get(id: string, meta?: MetaData): Promise<Attributes>;
    list(meta?: MetaData): Promise<Attributes[]>;
    delete(id: string, meta?: MetaData): Promise<any>
}