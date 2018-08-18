
export class DIError extends Error {
	//name: string
	message: string
	constructor(message: string = '') {
		super(message);
		this.message = message;
		Object.setPrototypeOf(this, DIError.prototype);
	}

	toString(): string {
		return `[${this.name}: ${this.message}]`
	}
}

export class DIAggregateError extends DIError {
	error: Error
	constructor(message: string, errors: Error) {
		super(message);
		this.error = errors;
		Object.setPrototypeOf(this, DIAggregateError.prototype);
	}

	get inner(): Error {
		if (this.error && (<any>this.error).inner) return (<any>this.error).inner;
		return this.error;
	}

	toString(): string {
		if (this.error == null) {
			return `[${this.name}: ${this.message}]`;
		} else {
			return String.prototype.toString.call(this.error);
		}
	}

}


export class DIBadKeyError extends DIError {
	name = 'BadKeyError'
	message = "key not registered with container"
	constructor(message?: string) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
	}
}



export function createError(name: string, message: string, error?: Error): Error {
	let e;
	if (error) {
		e = new DIAggregateError(message, error);
	} else {
		e = new DIError(message);
	}
	e.name = name;
	return e;
}