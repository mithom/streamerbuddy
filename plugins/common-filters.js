import Vue from 'vue'

Vue.filter('count', function (array, offset=0) {
  if(Array.isArray(array)) {
    return array.length + offset;
  }
  return array;
})

Vue.filter('pluck', function (array, attr) {
  if(Array.isArray(array)) {
    return array.map(obj => obj[attr]);
  }
  return array[attr];
})