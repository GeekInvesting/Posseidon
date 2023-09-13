import {CompleteItem} from "~/entities/complete.entity";

export function copyProperties(obj: { [key: string]: any }): CompleteItem[] {
  let results: CompleteItem[] = [];

  for (let index in obj) {
    let currentItem = obj[index];
    let result: Partial<CompleteItem> = {};

    for (let key in currentItem) {
      if (key === 'id') {
        result.link = currentItem[key];
      } else {
        result.value = currentItem[key];
      }
    }

    results.push(result as CompleteItem);
  }

  return results;
}
