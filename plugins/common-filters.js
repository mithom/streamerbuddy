import Vue from 'vue'

Vue.filter('count', function (array) {
  if(Array.isArray(array)) {
    return array.length;
  }
  return array;
})