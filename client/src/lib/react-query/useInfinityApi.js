import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfinityApi = (apiFunction, queryKey) => {
  return useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ pageParam }) => apiFunction({ page: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => (lastPage?.nextPage ? lastPage.nextPage : undefined),
    initialPageParam: 1
  });
};
