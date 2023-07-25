import SongItem from '@/components/SongItem.vue'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'

describe('SongItem.vue', () => {
  test('render the song.display_name', () => {
    const song = {
      display_name: 'test'
    }
    const wrapper = shallowMount(SongItem, {
      props: {
        song
      },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    const copositionAuthor = wrapper.find('.text-gray-500')

    expect(copositionAuthor.text()).toBe(song.display_name)
  })
})
