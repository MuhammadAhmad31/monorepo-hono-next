// config for TanStack libraries (e.g., React Query, React Table)
export const tanstackConfig = {
  query: {
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000, // 30 minutes
        refetchOnWindowFocus: false,
      },
    },
  },
  table: {
    defaultColumn: {
      minWidth: 100,
      width: 150,
      maxWidth: 400,
    },
    pagination: {
      pageSizeOptions: [10, 20, 50, 100],
      defaultPageSize: 20,
    },
  },
};