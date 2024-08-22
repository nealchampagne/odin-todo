import { compareAsc, parseJSON } from "date-fns";

// Sort the given arrays by date or alphabetically with no date
const sort = (arr) => {
  if (arr) {
    const sortedArray = arr.sort((a, b) => {
      // If no date value (projects), sort alphabetically
      if (!a.dueDate) {
        return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
      }

      if (a.dueDate) {
        // If both have a due date of 'None' then sort alphabetically
        if (a.dueDate === "None" && b.dueDate === "None") {
          return a.name.toUpperCase().localeCompare(b.name.toUpperCase());

          /** If either has a date and the other has 'None', put the one
           *  with no date first */
        } else if (a.dueDate === "None") {
          return -1;
        } else if (b.dueDate === "None") {
          return 1;
        }

        /** Put the task with the earlier due date first. If the dates
         *  are equal, sort alphabetically */
        if (compareAsc(parseJSON(a.dueDate), parseJSON(b.dueDate)) !== 0) {
          return compareAsc(parseJSON(a.dueDate), parseJSON(b.dueDate));
        } else {
          return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
        }
      }
    });
    return sortedArray;
  }
};

export default sort;
