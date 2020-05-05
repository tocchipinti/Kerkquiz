<template>
  <div class="question-image">
    <youtube :video-id="videoId"></youtube>
  </div>
</template>

<script>
import client from '../../sanityClient'
import imageUrlBuilder from '@sanity/image-url'
import getId from "get-youtube-id";

export default {
    data() {
    return {
      videoId: getId(this.url)
    };
  },
  props: {
    asset: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass">
.question-image
  display: flex
  justify-content: center
  max-height: 350px
  overflow: hidden

.image-src
  object-fit: contain
  padding: 0 1rem
  width: 100%
</style>
