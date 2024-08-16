import { compareAsc, parseJSON } from 'date-fns';

const sort = arr => {

  if (arr) {
    
    const sortedArray = arr.sort((a, b) => {

      if (!a.dueDate) {

        return a.name.toUpperCase().localeCompare(b.name.toUpperCase);

      };

      if (a.dueDate) {

      if (a.dueDate === 'None' && b.dueDate === 'None') {

        return a.name.toUpperCase().localeCompare(b.name.toUpperCase());

      } else if (a.dueDate === 'None') {

        return -1;

      } else if (b.dueDate === 'None') {

        return 1;
      }

      if (compareAsc(parseJSON(a.dueDate), parseJSON(b.dueDate)) !== 0) {

        return compareAsc(parseJSON(a.dueDate), parseJSON(b.dueDate));

      } else {

        return a.name.toUpperCase().localeCompare(b.name.toUpperCase());

      };
    }});
    return sortedArray;
  };
  return sortedArray;
};

export default sort;