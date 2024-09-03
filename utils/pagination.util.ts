// paginationUtil.ts
interface PaginationParams {
    page?: number;
    limit?: number;
  }
  
  interface PaginationOptions {
    offset: number;
    limit: number;
  }
  
  export function getPagination({ page = 1, limit = 100 }: PaginationParams): PaginationOptions {
    const offset = (page - 1) * limit;
    return { offset, limit };
  }
  