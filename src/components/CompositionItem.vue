<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deletSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = true"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        class="text-white text-center font-bold p-4 mb-4"
        v-if="show_alert"
        :class="alert_varient"
      >
        {{ alert_msg }}
      </div>
      <vee-form :validation-schema="schema" :initial-values="song" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('composition.title') }}</label>
          <vee-field
            type="text"
            name="modified_name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('composition.genre') }}</label>
          <vee-field
            type="text"
            name="genre"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            v-bind:placeholder="$t('composition.genre_placeholder')"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600 disabled:opacity-50"
          :disabled="in_submition"
        >
          {{ $t('composition.submit') }}
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600 disabled:opacity-50"
          @click.prevent="showForm = false"
          :disabled="in_submition"
        >
          {{ $t('composition.back') }}
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from '@/includes/firebase'

export default {
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true
    },
    updateSong: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    removeSong: {
      type: Function,
      required: true
    },
    updateUnsavedFlag: {
      typr: Function
    }
  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: 'required',
        genre: 'alpha_spaces'
      },
      in_submition: false,
      show_alert: false,
      alert_varient: 'bg-blue-500',
      alert_msg: 'Please wait! Updating song info.'
    }
  },
  methods: {
    async edit(values) {
      this.in_submition = true
      this.show_alert = true
      this.alert_varient = 'bg-blue-500'
      this.alert_msg = 'Please wait! Updating song info.'

      try {
        await songsCollection.doc(this.song.docID).update(values)
      } catch (error) {
        this.in_submition = false
        this.alert_varient = 'bg-red-500'
        this.alert_msg = 'Oops! Something went wrong'
        return
      }

      this.updateSong(this.index, values)
      this.updateUnsavedFlag(false)

      this.in_submition = false
      this.alert_varient = 'bg-green-500'
      this.alert_msg = 'Success! Song Updated.'
    },
    async deletSong() {
      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/${this.song.original_name}`)

      await songRef.delete()

      await songsCollection.doc(this.song.docID).delete()

      this.removeSong(this.index)
    }
  }
}
</script>
