import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

export const useSWRTemplate = (options) => {
    const {key, request, defaultValue, config = {}} = options;
    const {data, error, mutate, isValidating, ...other} = useSWR(
        key,
        request,
        config,
    );
    return {
        data: data || defaultValue,
        error,
        isLoading: !error && !data,
        isValidating,
        mutate,
        ...other,
    };
};

export const useSWRInfiniteTemplate = (options) => {
    const {key, request, pageSize = 20, config = {}} = options;
    const keyGenerator = (pageIndex, previousPageData) => [key, pageIndex];

    const {data, error, isValidating, mutate, size, setSize} = useSWRInfinite(
        keyGenerator,
        async (_key, _pageIndex, _pageSize) => {
            // sample api:
            // const result = await appStore.adminApi.getSuperProspectTransaction_(
            // 	{
            // 		pageSize: pageSize,
            // 		pageIndex: pageIndex,
            // 	}
            // );
            return await request(_key, _pageIndex, _pageSize);
        },
        config,
    );
    const flattenedData = data
        ? flatten([...data.map((item) => item.items)])
        : [];
    const hasMoreData = size * pageSize < get(last(data), 'totalItems', 0);
    return {
        data: data || [],
        flattenedData: flattenedData,
        error,
        isLoading: !error && !data,
        mutate,
        isValidating,
        size,
        setSize,
        hasMoreData,
    };
};

export const useSWRPaginationTemplate = (options = {}) => {
    const {key, request, pageSize = 20, config = {}} = options;
    const [page, setPage] = useState(1);
    const swr = useSWRTemplate({
        key: key ? [key, page, pageSize] : null,
        request: async (_key, _page, _pageSize) => {
            const {result} = await request(_key, _page, _pageSize);
            const totalPage = Math.ceil(
                get(result, 'totalItems', 0) / _pageSize,
            );
            return {
                data: get(result, 'items'),
                totalPage: totalPage === 0 ? 1 : totalPage,
                totalItems: get(result, 'totalItems'),
            };
        },
        defaultValue: {
            data: [],
            totalPage: 1,
            totalItems: 0,
        },
        config,
    });
    return {
        ...swr,
        ...swr.data,
        page,
        setPage,
    };
};
