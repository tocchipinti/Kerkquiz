<template>
  <div class="home">
    <div class="question-image">
      <img class="image-src" src="../assets/kompas.jpeg"/>
      <img class="image-src" src="../assets/lichtzijde.jpeg"/>
    </div>
    <h1 class="page-title">Welkom bij de kerkquiz</h1>
    <p class="page-subtitle">Vul de spelcode in om te spelen</p>
    <div class="question-image" style="margin-top: 10px">
      <input v-model="matchId">
    </div>
    <div class="question-image" style="margin-top: 10px">
      <button class="submitBtn" @click="toMatch">Naar het spel!</button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      matchId: ''
    }
  },
  methods: {
    toMatch() {
      this.$router.push({name: 'match', params: {slug: this.matchId}});
    }
  }
}
</script>

<style lang="sass" scoped>
.question-image
  display: flex
  justify-content: center
  max-height: 350px
  overflow: hidden

.image-src
  object-fit: contain
  padding: 0 1rem
  width: 100%

.submitBtn
  background-color: #008CBA; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;

</style>
