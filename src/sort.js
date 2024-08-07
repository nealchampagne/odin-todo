import { min, parseJSON } from 'date-fns';

const dateSort = arr => {
  console.log(arr);
  if (arr) {
  arr.sort((a, b) => {
    min([parseJSON(a.dueDate), parseJSON(b.dueDate)]) === parseJSON(a.dueDate) ? 1 : -1;
    console.log(min([parseJSON(a.dueDate), parseJSON(b.dueDate)]))

    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    nameA < nameB ? -1 : 1;

    return 0;
  })}
  return arr;
}

export default dateSort;