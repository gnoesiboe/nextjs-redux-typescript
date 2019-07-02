const express = require('express');
const next = require('next');
const getFromCacheOrCreate = require('./server/responseCache');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const createResponseBody = async (request, response) => {
    return await app.renderToHTML(
        request,
        response,
        request.path,
        request.queryParams
    );
};

const fileRequestHandler = (request, response) => handle(request, response);

app.prepare()
    .then(() => {
        const server = express();

        // serving _next static content and other assets using next.js handler, as they don't require caching
        server.get('/_next/*', fileRequestHandler);
        server.get('*.*', fileRequestHandler);

        server.get('/events/:id', async (request, response) => {
            const createAlternateResponseBody = async (request, response) => {
                const actualPage = '/event';
                const queryParams = { id: request.params.id };

                return await app.renderToHTML(
                    request,
                    response,
                    actualPage,
                    queryParams
                );
            };

            const [body, fromCache] = await getFromCacheOrCreate(
                request,
                response,
                createAlternateResponseBody
            );

            response.setHeader('X-Cache', fromCache ? 'HIT' : 'MISS');
            response.send(body);
        });

        server.get('*', async (request, response) => {
            const [body, fromCache] = await getFromCacheOrCreate(
                request,
                response,
                createResponseBody
            );

            response.setHeader('X-Cache', fromCache ? 'HIT' : 'MISS');
            response.send(body);
        });

        server.listen(3000, err => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
