class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    //this will search products according to name fields
    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            } : {

            }

        // console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;

    }


    //this function will filter the products with deleting some reserve word of search in query string
    filter() {
        const queryCopy = { ...this.queryStr };
        // console.log(queryCopy);


        //removing some fields of category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);
        // console.log(queryCopy);


        //2. price and rating filters
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        // console.log(queryStr);

        return this;
    }


    //pagination filter (products per page with skip already seen products on page before)
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skipProducts = resultPerPage * (currentPage - 1); //this will skip resultPerPage numbers of products on 2nd page 

        this.query = this.query.limit(resultPerPage).skip(skipProducts);
        return this;
    }


}

module.exports = ApiFeatures;