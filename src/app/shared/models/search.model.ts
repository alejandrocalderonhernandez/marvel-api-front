export class Search {
    constructor(
        public id?: string,
        public itemType?: ItemType
    ) {}
}

export enum ItemType {
    Characters = 'characters', 
    Comics = 'comics', 
    Creators = 'creators', 
    Events = 'events',
    Series = 'series'
}