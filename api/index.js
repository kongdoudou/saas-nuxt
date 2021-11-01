import request from '@/plugins/request';
// 获取资源位数据
export const fetchVideo = function(id) {
  return new Promise((resolve, reject) => {
    if(!id) {
      reject('资源位id不能为空');
    }
    request({
      url: 'http://lequ-qfe.iqiyi.com/api/nc/mixin/mixinResources/'+id+'?pageSize=8&pageNum=1',
      method:"GET",
      params:null
    }).then(res=> {
      res = res.data || {};
      if(res.code === 'A00000' && res.data && res.data.items && res.data.items.length) {
        let items = res.data.items.map(item => item && item.mixinVideo);
        resolve(items);
      } else {
        reject('接口数据返回为空');
      }
    }).catch(err => {
      reject(err);
    })
  });
};

// 获取当前页面中所包含的组件
export const fetchCards = function(pageId){
  return new Promise((resolve, reject) => {
    let result = [];
    if(pageId === '1') {
      result = [{id:1, relationId: 1}, {id:1, relationId: 2}]
    } else if(pageId === '2') {
      result = [{id:2, relationId: 3}, {id:1, relationId: 4}]
    }
    if(result && result.length) {
      resolve(result)
    } else {
      reject()
    }
  })
}

// 获取组件的自定义数据
export const fetchCustomData = function({id, relationId}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let resourceId = ''
      if(relationId === 1) {
        resourceId = '44243672312'
      } else if(relationId === 2) {
        resourceId = '44243663012'
      } else if(relationId === 3) {
        resourceId = '44243659212'
      } else if(relationId === 4) {
        resourceId = '44243659212'
      }
      if(resourceId) {
        resolve({id, relationId, customData: {rId: resourceId}});
      } else {
        reject('组件自定义数据为空')
      }
    }, 1000);
  });
};
