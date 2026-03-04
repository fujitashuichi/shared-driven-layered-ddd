const removeControlChars = (str: string) => {
  return str.replace(/[\u0000-\u001F\u007F]/g, "");
}

export const stringValidator = (str: string): boolean => {
  const cleaned = removeControlChars(str);

  // 異常値検査結果: booleanを逆にしないように注意
  const hasControlChars = cleaned !== str;
  const hasScriptTag = /<\s*script\b/i.test(str);

  if (hasControlChars || hasScriptTag) {
    console.error("Invalid Character Detected");
    return false;
  }

  return true;
}
