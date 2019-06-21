export type EventOverviewResponse = EventOverviewItem[];

export type EventOverviewItem = {
    id: number;
    title: string;
    performer: string;
    genre: string;
    location: string;
    startsAt: string;
    endsAt: string | null;
    publishedAt: string;
    updatedAt: string | null;
    url: string;
    description: string | null;
    images: string[];
};
