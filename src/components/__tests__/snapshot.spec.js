import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import SongItem from '@/components/SongItem.vue'

describe('snapshot SongItem.vue', () => {
  test('renders correctly', () => {
    const song = {
      docID: 'abc',
      display_name: 'test',
      modified_name: 'test',
      comment_count: 10
    }

    const wrapper = shallowMount(SongItem, {
      props: { song },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
