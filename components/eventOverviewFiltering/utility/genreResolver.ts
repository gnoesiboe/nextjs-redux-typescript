import { EventOverviewItem } from '../../../api/response/types';

export type GenreMap = {
    [key: string]: number;
};

export function resolveUsedGenres(events: EventOverviewItem[]): GenreMap {
    const genreMap: GenreMap = {};

    // first extract all used genres from events
    events.forEach(cursorEvent => {
        if (typeof genreMap[cursorEvent.genre] === 'undefined') {
            genreMap[cursorEvent.genre] = 0;
        }

        genreMap[cursorEvent.genre]++;
    });

    // then sort genres by amount
    const orderedGenreMap: GenreMap = {};

    Object.keys(genreMap)
        .sort(function(firstKey, secondKey) {
            if (genreMap[firstKey] < genreMap[secondKey]) {
                return 1;
            }

            if (genreMap[firstKey] > genreMap[secondKey]) {
                return -1;
            }

            return 0;
        })
        .forEach(function(key: string) {
            orderedGenreMap[key] = genreMap[key];
        });

    return orderedGenreMap;
}
