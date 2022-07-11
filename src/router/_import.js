let modules = import.meta.glob('../pages/**/*.vue')
function _import(component) {
    // return new Promise((resolve,reject)=>{
    //     import('../pages/'+component+'.vue').then(result =>{
    //         resolve(result.default)
    //     })
    // })
    return modules[`../pages/${component}.vue`]
    // return ()=>import("../pages/" + component + ".vue");
  }
  function asyncRouteMap(list) {
    return list.map((item, index) => {
      if (item?.children && item?.children.length) {
        item.children = asyncRouteMap(item.children);
      } else {
        item.component = _import(item.component);
      }
    });
  }
  
  export { _import, asyncRouteMap };
  