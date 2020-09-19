function sortByName(array) {
  array.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  return array;
}

function sortByDate(array) {
  array.sort((a, b) => {
    let dateA = new Date(a.created);
    let dateB = new Date(b.created);
    return dateB - dateA;
  });

  return array;
}

function sortArrayByElementOccurences(arrayOfItemsIds) {
  const numberItemUsed = {};

  arrayOfItemsIds.forEach((id) => {
    if (numberItemUsed[id]) {
      numberItemUsed[id]++;
      return;
    }

    numberItemUsed[id] = 1;
  });

  let keys = [];

  for (let key in numberItemUsed) {
    if (numberItemUsed.hasOwnProperty(key)) {
      keys.push(key);
    }
  }

  keys.sort((a, b) => {
    if (numberItemUsed[a] < numberItemUsed[b]) {
      return 1;
    }
    if (numberItemUsed[a] > numberItemUsed[b]) {
      return -1;
    }
    return 0;
  });

  return keys;
}

module.exports = {
  sortByName,
  sortByDate,
  sortArrayByElementOccurences,
};
