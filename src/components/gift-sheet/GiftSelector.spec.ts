// src/components/HelloWorld.spec.ts
import { mount } from '@vue/test-utils'
import giftsjson from '../../assets/gifts.json'
import { createStore, Store } from 'vuex'
import GiftSelector from './GiftSelector.vue'
import { GET_GIFTS_LIST } from '../../store/mutations-types'

describe('Gift Selector', () => {


let store:Store<{}>


beforeEach(() => {
    store = createStore({
        state: { gifts: giftsjson},
        getters: {
          [GET_GIFTS_LIST] (state){
            return state.gifts
          }
        }
    });

})

  it('should display gifts', async () => {
    const wrapper = mount(GiftSelector, {
        global: { plugins: [store] },
    })

    expect(wrapper.find('h1').text()).toEqual('waouh')
  })
})
