export function getModuleInstance(VueInstance){
  //get the root of the module, no matter where the settings tag is defined
  if(VueInstance.$parent.$options._componentTag === 'Modules'){
    return VueInstance
  }else{
    return getModuleInstance(VueInstance.$parent)
  }
}

export function componentName(anyComponent){
  const parent = getModuleInstance(anyComponent.$parent)
  return parent.$attrs.component || parent.component
}