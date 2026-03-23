
export const schemaTransformer = {
  // prismaが受け入れる形に整形する

  // null -> { set: null }
  // undefined -> 抹消

  /* 使用
    schema.transform(toPrismaUpdate)
  */

  toPrismaUpdate: <T extends Record<string, any>>(data: T) => {
    return Object.fromEntries(
      Object.entries(data)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [
          k,
          { set: v }
        ])
    ) as {
      [K in keyof T]?: { set: T[K] }
    };
  },
}
