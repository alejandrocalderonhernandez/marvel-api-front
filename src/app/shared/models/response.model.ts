import { Item } from "./item.model";

export class Response {

    public constructor(
        public status: string,
        public offset: number,
        public limit: number,
        public total: number,
        public items: Item[]
    ) {}

}
