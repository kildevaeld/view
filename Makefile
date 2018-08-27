
.PHONY: build clean watch example


build:
	@node_modules/.bin/lerna run build --no-private --stream

clean:
	@node_modules/.bin/lerna run clean --parallel

watch:
	@node_modules/.bin/lerna run watch --no-sort --stream --no-private --parallel

test:
	@node_modules/.bin/lerna run test --no-sort --stream --no-private --parallel

example:
	@node_modules/.bin/http-server -c-1 packages/viewjs-example/dist

watch-example:
	@node_modules/.bin/lerna run watch --stream --scope=viewjs-example

create-package:
	@yarn run create-package
	@yarn