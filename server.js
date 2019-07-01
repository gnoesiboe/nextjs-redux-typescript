const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const cache = new LRUCache({
    // cache size will be 100 MB using `return n.length` as length() function
    max: 100 * 1024 * 1024,
    length: function(n) {
        return n.length;
    },
    maxAge: 1000 * 60 * 60 * 24, // 24 hours
});

const createCacheKey = request => request.path;

const getFromCache = request => cache.get(createCacheKey(request));

const writeToCache = (request, response) =>
    cache.set(createCacheKey(request), response);

const getFromCacheOrCreate = async (request, response, createResponseBody) => {
    console.debug(' --> fetch', request.path);

    const existingResponseBody = getFromCache(request);

    if (existingResponseBody) {
        console.debug(' --> existing cache', request.path);

        return [existingResponseBody, true];
    }

    console.debug(' --> create new cache', request.path);

    const createdResponseBody = await createResponseBody(request, response);

    // only cache response when it is a successful request
    if (response.statusCode === 200) {
        console.debug(' --> write to cache', request.path);

        writeToCache(request, createdResponseBody);
    } else {
        console.warn(
            ` --> don't write to cache due to ${response.statusCode} response`,
            request.path
        );
    }

    return [createdResponseBody, false];
};

const createResponseBody = async (request, response) => {
    return await app.renderToHTML(
        request,
        response,
        request.path,
        request.queryParams
    );
};

app.prepare()
    .then(() => {
        const server = express();

        server.get('/_next/*', (request, response) => {
            // serving _next static content using next.js handler, as they don't require caching
            handle(request, response);
        });

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
