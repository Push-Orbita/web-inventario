export const replaceParamId = (url: string, id: number) =>
    url.replace(/:id/g, String(id));
  

export const omitId = <T extends { id: number }>(dto: T): Omit<T, 'id'> => {
    const { id, ...rest } = dto;
    return rest;
}