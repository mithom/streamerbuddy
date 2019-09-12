function isPortalTarget(VueInstance){
  return VueInstance.$parent.$options._componentTag === 'portal-target' &&
    VueInstance.$parent.$props.name === 'Modules'
}

function isPortal(VueInstance){
  return VueInstance.$parent.$options._componentTag === 'portal' &&
    VueInstance.$parent.$props.to === 'Modules'
}

function isComponent(VueInstance){
  return VueInstance.$parent.$options._componentTag === 'draggable' &&
    VueInstance.$parent.$attrs?.["group"]?.name === 'componentList'
}

export function getMainComponentInstance(VueInstance){
  //get the root of the module, no matter where the settings tag is defined
  if(isPortalTarget(VueInstance) || isPortal(VueInstance) || isComponent((VueInstance))){
    return VueInstance
  }else{
    return getMainComponentInstance(VueInstance.$parent)
  }
}

export function componentName(anyComponent){
  const parent = getMainComponentInstance(anyComponent.$parent)
  return parent.$attrs?.component || parent.component
}

export function moduleName(anyComponent){
  const parent = getMainComponentInstance(anyComponent.$parent)
  return parent.$attrs?.module || parent.module
}