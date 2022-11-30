function getMinMax(str) {
  return str
    .split(" ")
    .filter((item) => !isNaN(item))
    .reduce((mm, item) => {
      mm.min = mm.min < +item ? mm.min : +item;
      mm.max = mm.max > +item ? mm.max : +item;
      return mm;
    }, {});
}
