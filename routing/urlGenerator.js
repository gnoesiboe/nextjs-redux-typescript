// This file is a regular Javascript file and not Typescript, to be able to
// re-use it in next.config.js

module.exports = {
    home: {
        path: '/',
        page: '/',
    },
    about: {
        path: '/about',
        page: '/about',
    },
    eventOverview: {
        path: '/events',
        page: '/events',
    },
    eventDetail: {
        path: id => `/events/${id}`,
        page: '/events/[id]',
    },
};
