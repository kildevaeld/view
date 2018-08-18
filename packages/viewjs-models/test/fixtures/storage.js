const uniqueId = require('@viewjs/utils').uniqueId,
    {
        createError,
        ModelErrorCode
    } = require('../../lib/errors');

exports.Storage = class Storage {
    constructor() {
        this.items = [];
    }

    save(model, meta) {
        return new Promise((res, rej) => {

            if (model.id) {
                const found = this.items.find(m => m.id === model.id);
                if (!found) return rej(new createError(ModelErrorCode.NotFound));
                if (found !== model) {
                    found.set(model.toJSON());
                }

            } else {
                this.items.push(model);
                model.id = uniqueId();
            }
            return res(model);
        })

    }

    get(id) {
        return new Promise((res, rej) => {

            const found = this.items.find(m => m.id === id);
            if (!found) rej(createError(ModelErrorCode.NotFound));

            res(found.toJSON());
        });
    }

    delete(id) {
        return new Promise((res, rej) => {

            const found = this.items.findIndex(m => m.id === id);
            if (!~found) rej(createError(ModelErrorCode.NotFound));

            this.items.splice(found, 1);

            res();

        });
    }
}