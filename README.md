###BUILD APP

1. From console `npx webpack`
2. From console with arguments `npx webpack --build-dir=/some/build/dir`
3. From console for prod `npx webpack --env=production`
4. Build via package.json `npm run build`
5. Build for prod via package.json `npm run build-production`
6. Build with resource url `npx webpack --build-dir=/bin --resource-url="http://localhost:8888/"`
7. Build with `--env=production` sets resource url to `/` e.g. `npx webpack --build-dir=/bin --env=production`

### BUILD AND UPLOAD FOR PRODUCTION

0. `npx webpack --build-dir=/Users/gropaga/Documents/wp-galdnieki/bin --env=production --mode=production --ga="UA-127752341-1"`
0. `scp /Users/someuser/project/bin/* user@sshplace:/home/user/www/project/bin/`