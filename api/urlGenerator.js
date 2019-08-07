// This file is a regular Javascript file and not Typescript, to be able to
// re-use it in next.config.js pre static rendering with dynamic content

const baseUrl = 'https://www.theaterstilburg.nl';

module.exports = {
    apiEventOverviewPath: `${baseUrl}/api/public/events`,
};
