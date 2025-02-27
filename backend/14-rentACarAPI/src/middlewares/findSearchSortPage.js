"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// app.use(findSearchSortPage):

module.exports = (req, res, next) => {  
    // Searching & Sorting & Pagination:  

    // SEARCHING: URL?search[key1]=value1&search[key2]=value2
    const search = req.query?.search || {};
    for (let key in search) {
        search[key] = { $regex: search[key], $options: 'i' };
    }

    // SORTING: URL?sort[key1]=asc&sort[key2]=desc (asc: A->Z - desc: Z->A)
    const sort = req.query?.sort || {};

    // PAGINATION: URL?page=1&limit=10
    // LIMIT:
    let limit = parseInt(req.query?.limit, 10);
    limit = limit > 0 ? limit : parseInt(process.env?.PAGE_SIZE, 10) || 20;
    // PAGE:
    let page = parseInt(req.query?.page, 10);
    page = (page > 0 ? page : 1) - 1;
    // SKIP:
    let skip = parseInt(req.query?.skip, 10);
    skip = skip > 0 ? skip : (page * limit);

    // Run SearchingSortingPagination engine for Model:
    res.getModelList = async function (Model, filters = {}, populate = null) {
        const filtersAndSearch = { ...filters, ...search };
        return await Model.find(filtersAndSearch).sort(sort).skip(skip).limit(limit).populate(populate);
    };

    // Details:
    res.getModelListDetails = async function (Model, filters = {}) {
        const filtersAndSearch = { ...filters, ...search };
        const dataCount = await Model.countDocuments(filtersAndSearch);

        let details = {
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 0 ? page : false),
                current: page + 1,
                next: page + 2,
                total: Math.ceil(dataCount / limit)
            },
            totalRecords: dataCount,
        };
        details.pages.next = (details.pages.next > details.pages.total ? false : details.pages.next);
        if (details.totalRecords <= limit) details.pages = false;
        return details;
    };

    next();
};