// src/components/HelloWorld.spec.ts
import { mount } from '@vue/test-utils'
import giftsjson from '../../../test/jest/__mocks__/giftsMock.json'
import { createStore, Store } from 'vuex'
import GiftSelector from './GiftSelector.vue'
import { GET_GIFTS_LIST, SET_SELECTED_ID } from '../../store/mutations-types'

describe('Gift Selector', () => {


let store:Store<{}>
const mockedSetSelectedIdFunc = jest.fn();


beforeEach(() => {
    store = createStore({
        state: { gifts: giftsjson},
        getters: {
          [GET_GIFTS_LIST] (state){
            return state.gifts
          }
        },
        mutations : {
          [SET_SELECTED_ID]:mockedSetSelectedIdFunc
        }
    });
})

  it('displays all gifts by default', () => {
    const wrapper = mount(GiftSelector, {global: { plugins: [store] }})
    expect(wrapper.findAll('.prezzy-item-wrapper').length).toBe(4);
  })

  it('selects new gift ID on icon click', async () => {
    const wrapper = mount(GiftSelector, {global: { plugins: [store] }})
    const giftIcon = wrapper.find('.prezzy-item-wrapper')
    await giftIcon.trigger('click')
    expect(mockedSetSelectedIdFunc).toHaveBeenCalled()
  })

})
