import { Product } from "./product";

export class ProductResponse {

    /**
     *
     */
    constructor(public responseCode: string,
        public responseMsg: string,
        public responseBody: any) { }
}
