export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
};

export const paginationHelper = async <TEntity>(
  findManyAndCountFn: (
    take: number,
    skip: number,
  ) => Promise<[number, TEntity[]]>,
  options: PaginateOptions,
): Promise<PaginatedResult<TEntity>> => {
  const page = Number(options?.page) || 1;
  const take = Number(options?.perPage) || 20;
  const skip = page > 0 ? take * (page - 1) : 0;
  const [total, data] = await findManyAndCountFn(take, skip);
  const lastPage = Math.ceil(total / take);

  return {
    data,
    meta: {
      total,
      lastPage,
      currentPage: page,
      perPage: take,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
    },
  };
};
