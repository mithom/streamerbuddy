function isPortalTarget(VueInstance){
  return VueInstance.$parent.$options._componentTag === 'portal-target' &&
    VueInstance.$parent.$props.name === 'Modules'
}

function isPortal(VueInstance){
  return VueInstance.$parent.$options._componentTag === 'portal' &&
    ['Modules','Commands'].includes(VueInstance.$parent.$props.to)
}

function isComponent(VueInstance){
  return VueInstance.$parent.$options._componentTag === 'draggable' &&
    VueInstance.$parent.$attrs?.["group"]?.name === 'componentList'
}

export function getMainComponentInstance(VueInstance){
  //get the root of the module, no matter where the settings tag is defined
  //if(isPortalTarget(VueInstance) || isPortal(VueInstance) || isComponent((VueInstance))){
  if(VueInstance.$attrs.hasOwnProperty('component') || VueInstance.hasOwnProperty('component')){
    return VueInstance
  }else{
    return getMainComponentInstance(VueInstance.$parent)
  }
}

export function componentName(anyComponent){
  const component = getMainComponentInstance(anyComponent)
  return component.$attrs?.component || component.component
}

export function moduleName(anyComponent){
  const module = getMainComponentInstance(anyComponent)
  return module.$attrs?.module || module.module
}
