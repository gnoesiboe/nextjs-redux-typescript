import React from 'react';
import { NextFunctionComponent } from 'next';
import { GenreMap } from '../utility/genreResolver';

type OnChangeCallback = (event: React.ChangeEvent<HTMLSelectElement>) => void;

type Props = {
    genres: GenreMap;
    onChange: OnChangeCallback;
    currentValue: string | null;
};

const GenreChoice: NextFunctionComponent<Props> = ({
    genres,
    onChange,
    currentValue,
}) => (
    <select onChange={onChange} value={currentValue || undefined}>
        <option value="">-- genre --</option>
        {Object.keys(genres).map(title => (
            <option key={title} value={title}>
                {title} ({genres[title]})
            </option>
        ))}
    </select>
);

export default GenreChoice;
