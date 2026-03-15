import { z } from 'zod';


// このMapperは、Zodのparse機能により、スキーマに存在しないプロパッティを暗黙的に削る
// そのため、明示的にプロパッティを消さなくても動作するが仕様である


type Props<T> = {
  data: unknown,
  nullToUndefined: boolean,
  schema: T
}

// 単一の文字列を snake_case から camelCase に変換するヘルパー
const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};


export const dbObjectToCamel = <T extends z.ZodTypeAny>({
  data,
  nullToUndefined,
  schema
}: Props<T>): z.infer<T> => {

  function mapDbRow(item: any): any {
    if (Array.isArray(item)) {
      return item.map(mapDbRow);
    }
    if (item !== null && typeof item === 'object') {
      const n: Record<string, any> = {};
      Object.keys(item).forEach((key) => {
        n[toCamel(key)] = mapDbRow(item[key]);
      });
      return n;
    }
    // null を undefined に変換
    if (nullToUndefined && item === null) return undefined;
    else return item;
  }

  const camelCaseData = mapDbRow(data);

  // Zod でバリデーション・型確定
  return schema.parse(camelCaseData);
};

//====================================================================//

type ToDbProps = {
  data: any;
  removeUndefined?: boolean;
};

// camelCase から snake_case への変換ヘルパー
const toSnake = (s: string) => {
  return s.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const camelToDbObject = ({
  data,
  removeUndefined = true
}: ToDbProps): Record<string, any> => {

  function mapToDb(item: any): any {
    // 配列の再帰処理
    if (Array.isArray(item)) {
      return item.map(mapToDb);
    }

    // オブジェクトの処理
    if (item !== null && typeof item === 'object' && !(item instanceof Date)) {
      const n: Record<string, any> = {};
      Object.keys(item).forEach((key) => {
        const value = item[key];

        // PATCH処理の要件：undefined を除外するかどうかの判定
        if (removeUndefined && value === undefined) {
          return;
        }

        n[toSnake(key)] = mapToDb(value);
      });
      return n;
    }

    return item;
  }

  return mapToDb(data);
};
