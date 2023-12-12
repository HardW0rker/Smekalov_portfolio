


export const getById = async (id: string): Promise<BillResponse | undefined> => {
    try {
        return await axios
            .get<BillResponse>(`${BillRouter.ROOT}/${id}`)
            .then((response) => {
                if (response && response.data) {
                    return response.data
                }
                return undefined;
            })
    } catch (ex) {
        console.error(ex)
    }
}

export const getByIds = async (request: GlobalIdsRequest<string>): Promise<BillMultipleResponse | undefined> => {
    try {
        return await axios
            .post<BillMultipleResponse>(BillRouter.GET, request)
            .then((response) => {
                if (response && response.data) {
                    return response.data
                }
                return undefined;
            })
    } catch (ex) {
        console.error(ex)
    }
}

export const getByFilter = async (request: PageableFilterRequest<BillFilter>): Promise<PageableResponse<BillResponse> | undefined> => {
    try {
        return await axios
            .post<PageableResponse<BillResponse>>(BillRouter.FILTER, request)
            .then((response) => {
                if (response && response.data) {
                    return response.data
                }
                return undefined;
            })
    } catch (ex) {
        console.error(ex)
    }
}

export const getByCounterpartyIds = async (request: GlobalIdsRequest<number>): Promise<BillMultipleResponse | undefined> => {
    try {
        return await axios
            .post<BillMultipleResponse>(BillRouter.BY_COUNTERPARTY_ALL, request)
            .then((response) => {
                if (response && response.data) {
                    return response.data
                }
                return undefined;
            })
    } catch (ex) {
        console.error(ex)
    }
}


export const create = async (request: CreateBillRequest): Promise<BillResponse | undefined> => {
    try {
        return await axios
            .post<BillResponse>(BillRouter.ROOT, request)
            .then((response) => {
                if (response && response.data) {
                    return response.data
                }
                return undefined;
            })
    } catch (ex) {
        console.error(ex)
    }
}

export const update = async (id: string, request: UpdateBillRequest): Promise<BillResponse | undefined> => {
    try {
        return await axios
            .put<BillResponse>(`${BillRouter.ROOT}/${id}`, request)
            .then((response) => {
                if (response && response.data) {
                    return response.data
                }
                return undefined;
            })
    } catch (ex) {
        console.error(ex)
    }
}

export const getUniqueStatuses = async (): Promise<UniqueElementResponse<EBillStatus> | undefined> => {
    try {
        return await axios
            .get<UniqueElementResponse<EBillStatus>>(BillRouter.UNIQUE_STATUS)
            .then((response) => {
                if (response && response.data) {
                    return response.data
                }
                return undefined;
            })
    } catch (ex) {
        console.error(ex)
    }
}

export const getUniqueCounterpartyIds = async (): Promise<UniqueElementResponse<number> | undefined> => {
    try {
        return await axios
            .get<UniqueElementResponse<number>>(BillRouter.UNIQUE_COUNTERPARTY)
            .then((response) => {
                if (response && response.data) {
                    return response.data
                }
                return undefined;
            })
    } catch (ex) {
        console.error(ex)
    }
}