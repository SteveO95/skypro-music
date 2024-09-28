export function getUniqueValues<T, K extends keyof T>(
  items: T[] | undefined | null, // Добавляем возможность, что items может быть undefined или null
  field: K
): string[] {
  if (!items || items.length === 0) {
    return []; // Возвращаем пустой массив, если items не определен или пуст
  }

  const uniqueValues = new Set<string>();
  items.forEach((item) => {
    uniqueValues.add(String(item[field]));
  });
  return Array.from(uniqueValues);
}
