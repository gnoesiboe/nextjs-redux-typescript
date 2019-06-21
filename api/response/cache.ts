type CacheType = {
    [identifier: string]: any;
};

const cache: CacheType = {};

export enum CacheIdentifier {
    Events = 'events_cache',
}

export function write<ResponseType>(
    identifier: string,
    response: ResponseType
): void {
    cache[identifier] = response;
}

export function get<ResponseType>(
    identifier: string
): ResponseType | undefined {
    return has(identifier) ? cache[identifier] : undefined;
}

export async function getOrCreate<ResponseType>(
    identifier: string,
    create: () => Promise<ResponseType>
): Promise<ResponseType> {
    if (has(identifier)) {
        const result = get<ResponseType>(identifier);

        if (result) {
            return result;
        }
    }

    const response: ResponseType = await create();

    await write(identifier, response);

    return response;
}

export function has(identifier: string): boolean {
    return typeof cache[identifier] !== 'undefined';
}
