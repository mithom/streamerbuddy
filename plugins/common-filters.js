import Vue from 'vue'

Vue.filter('count', function (array, offset=0) {
  if(Array.isArray(array)) {
    return array.length + offset;
  }
  return array;
})

Vue.filter('pluck', function (obj, attr) {
  if(Array.isArray(obj)) {
    return obj.map(obj => obj?.[attr]);
  }
  return obj?.[attr];
})