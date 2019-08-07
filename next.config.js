const urlGenerator = require('./routing/urlGenerator');
const apiUrlGenerator = require('./api/urlGenerator');
const Axios = require('axios');

module.exports = {
    // @see https://nextjs.org/learn/excel/static-html-export/exporting-other-pages
    exportPathMap: async function() {
        const paths = {
            [urlGenerator.home.path]: { page: urlGenerator.home.page },
            [urlGenerator.about.path]: { page: urlGenerator.about.page },
            [urlGenerator.eventOverview.path]: {
                page: urlGenerator.eventOverview.page,
            },
        };

        const response = await Axios.get(apiUrlGenerator.apiEventOverviewPath);

        response.data.forEach(event => {
            const path = urlGenerator.eventDetail.path(event.id);
            const page = urlGenerator.eventDetail.page;

            paths[path] = {
                page,
                query: {
                    id: event.id,
                },
            };
        });

        return paths;
    },
};
