
.PHONY: build clean watch example


build:
	@node_modules/.bin/lerna run build --no-private --stream

clean:
	@node_modules/.bin/lerna run clean --parallel

watch:
	@node_modules/.bin/lerna run watch --no-sort --stream --no-private --parallel

example:
	@node_modules/.bin/http-server -c-1 packages/viewjs-example/dist