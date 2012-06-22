NODE = node

test:
	@$(NODE) node_modules/mocha/bin/mocha --ui tdd --reporter spec

.PHONY: test
