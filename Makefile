
install: hooks
	yarn --cwd server install --frozen-lockfile
	yarn --cwd ui install --frozen-lockfile

start:
	docker-compose up -d --build --force-recreate

stop:
	docker-compose stop

clean:
	docker-compose kill && docker system prune --force --volumes
	
test:
	yarn --cwd server test

coverage:
	yarn --cwd server coverage

lint:
	yarn --cwd server lint
	yarn --cwd ui lint

hooks:
	git config core.hooksPath .githooks
	chmod +x .githooks/*

ci: install lint coverage
