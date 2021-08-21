import { environment } from "src/environments/environment";
import { Item } from "./item.model";

export class Response {

    public constructor(
        public status: string = 'No data',
        public offset: number = 0,
        public limit: number = environment.itemsPerPage,
        public total: number = 0,
        public items: Item[] = []
    ) {}

}
