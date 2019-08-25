export class ProductRequest {


    /**
     *Creates an instance of ProductRequest.
     * @param {string} title
     * @param {string} description
     * @param {number} price
     * @memberof ProductRequest
     */
    constructor(public title: string,
        public description: string,
        public price: number) { }
}
