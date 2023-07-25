import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import SongItem from '@/components/SongItem.vue'

describe('router', () => {
  test('render router links', () => {
    const song = {
      docID: 'abc'
    }

    const wrapper = shallowMount(SongItem, {
      props: { song },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'song',
      params: { id: song.docID }
    })
  })
})
