const LRUCache = require('lru-cache');

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

module.exports = getFromCacheOrCreate;
