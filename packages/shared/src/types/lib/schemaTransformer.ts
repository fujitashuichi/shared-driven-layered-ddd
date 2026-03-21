
export const schemaTransformer = {
  // prismaが受け入れる形に整形する

  // null -> { set: null }
  // undefined -> 抹消

  /* 使用
    schema.transform(toPrismaUpdate)
  */

  toPrismaUpdate: (data: Record<string, any>) => {
    return Object.fromEntries(
      Object.entries(data)
        .filter(([_, v]) => v !== undefined) // 更新しない項目（undefined）を除外
        .map(([k, v]) => [k, v === null ? { set: null } : v]) // null なら { set: null }
    );
  },
}
