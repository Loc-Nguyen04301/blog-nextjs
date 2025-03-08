export interface BlogPageParams {
    page?: number;
    itemsPerPage?: number;
    keyword?: string
}

export interface BlogByMonthPageParams {
    page?: number;
    itemsPerPage?: number;
    year: number,
    month: number
}

export interface VideoPageParams {
    page?: number;
    itemsPerPage?: number;
}