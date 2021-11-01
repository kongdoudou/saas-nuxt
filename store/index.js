import Vue from 'vue';
import Vuex from 'vuex';
import {fetchCards, fetchCustomData, fetchVideo} from '../api'

Vue.use(Vuex);

function createStore() {
  const store = new Vuex.Store({
    state: {
      pageName: '',
      bar: '',
      cards: []
    },

    mutations: {
      'SET_NAME'(state, name) {
        state.pageName = name;
      },
      'SET_VIDEOS'(state, videosData) {
        let cards = [...state.cards];
        console.log(cards);
        cards = cards.map(card => {
          if(card.customData.rId) {
            card.sourceData = videosData[0];
            videosData.splice(0,1)
          }
        });
        // state.cards = cards;
      },
      'SET_CARDS'(state, data) {
        state.cards = data;
      }
    },

    actions: {
      // 获取组件的自定义数据
      fetchData({ commit, state }, pageId) {
        let pageCards = [];
        commit('SET_NAME', '页面_' + pageId);
        return fetchCards(pageId).then(cards => {
          if(cards && cards.length) {
            let resAry = [];
            cards.map(card => {
              resAry.push(fetchCustomData(card))
            })
            if(resAry && resAry.length) {
              return Promise.all(resAry)
            }
          }
        }).then(cardsData => {
          if(cardsData && cardsData.length) {
            let getResources = []
            cardsData.map(cardData => {
              if(cardData.customData && cardData.customData.rId) {
                cardData.reqIndex = getResources.length;
                getResources.push(fetchVideo(cardData.customData.rId))
              }
            });
            pageCards = cardsData;
            return Promise.all(getResources)
          }
        }).then(videosData => {
          pageCards = pageCards.map(pageCard => {
            let videoData = videosData[pageCard.reqIndex];
            // videoData = videoData.map(item => item.mixinVideo);
            pageCard.sourceData = videoData;
            return pageCard;
          });
          commit('SET_CARDS', pageCards);
          return pageCards;
        }).catch(err=> {
          console.error(err)
        })
      }
    }
  });

  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    // 浏览器渲染，就用服务端加载好的数据把浏览器中的store替换掉，也就是将后端渲染好的结果同步给前端
    store.replaceState(window.__INITIAL_STATE__);
  } else {
    console.log('no browser');
  }

  return store;
}

export default createStore;
