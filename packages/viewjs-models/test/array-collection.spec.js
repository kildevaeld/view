const ArrayCollection = require('../lib/array-collection').ArrayCollection,
	Model = require('../lib/model').Model;

describe('Array Collection', () => {


	it('should serialize to a json object', () => {


		const col = new ArrayCollection();
		col.push(new Model({
			name: 'Hello'
		}));
		col.push({
			name: 'test'
		});

		col.toJSON().should.be.eql([{
			name: 'Hello'
		}, {
			name: 'test'
		}]);

	});

})