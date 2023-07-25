import { RouterLinkStub, mount } from '@vue/test-utils'
import AppHome from '@/views/HomeView.vue'
import SongItem from '@/components/SongItem.vue'

vi.mock('@/includes/firebase', () => ({
  songsCollection: () => Promise.resolve()
}))

describe('AppHome.vue', () => {
  test('renders list of songs', () => {
    const songs = [{}, {}, {}]
    const component = mount(AppHome, {
      data() {
        return {
          songs
        }
      },
      global: {
        mocks: {
          $t: (message) => message
        },
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    const items = component.findAllComponents(SongItem)

    expect(items).toHaveLength(songs.length)
  })
})
