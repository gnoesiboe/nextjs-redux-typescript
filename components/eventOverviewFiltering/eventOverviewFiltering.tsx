import React, { useCallback } from 'react';
import { NextFunctionComponent } from 'next';
import { EventOverviewItem } from '../../api/response/types';
import { resolveUsedGenres } from './utility/genreResolver';
import GenreChoice from './components/GenreChoice';

type Props = {
    events: EventOverviewItem[];
    onGenreChange: (genre: string | null) => void;
    onQueryChange: (query: string | null) => void;
    currentGenre: string | null;
    currentQuery: string | null;
};

const EventOverviewFiltering: NextFunctionComponent<Props> = ({
    events,
    onGenreChange,
    onQueryChange,
    currentGenre,
    currentQuery,
}) => {
    const onGenreChangeCallback = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            onGenreChange(event.target.value || null);
        },
        []
    );

    const onQueryChangeCallback = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onQueryChange(event.target.value || null);
        },
        []
    );

    return (
        <div>
            <GenreChoice
                genres={resolveUsedGenres(events)}
                onChange={onGenreChangeCallback}
                currentValue={currentGenre}
            />
            <input
                type="text"
                placeholder="Titel, performer.."
                onChange={onQueryChangeCallback}
                value={currentQuery || ''}
            />
        </div>
    );
};

export default EventOverviewFiltering;
