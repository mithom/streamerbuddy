function isPortalTarget(VueInstance){
  return VueInstance.$parent.$options._componentTag === 'portal-target' &&
    VueInstance.$parent.$props.name === 'Modules'
}

function isPortal(VueInstance){
  return VueInstance.$parent.$options._componentTag === 'portal' &&
    VueInstance.$parent.$props.to === 'Modules'
}

export function getModuleInstance(VueInstance){
  //get the root of the module, no matter where the settings tag is defined
  if(isPortalTarget(VueInstance) || isPortal(VueInstance)){
    return VueInstance
  }else{
    return getModuleInstance(VueInstance.$parent)
  }
}

export function componentName(anyComponent){
  const parent = getModuleInstance(anyComponent.$parent)
  return parent.$attrs.component || parent.component
}