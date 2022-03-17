<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { htmlDecode } from "../util/utils.js";

// declare vuex store and router for use in the component
const store = useStore();
const router = useRouter();

// declare reference to userAnswers state which contains questions,
// the right and wrong answers and user answers

const userAnswers = computed(() => store.state.userAnswers);

// handler for 'Replay' button, resets and gets new questions
const onReplayClick = async () => {
  store.commit("setCurrentQuestionIndex", 0);
  store.commit("setScore", 0);
  await store.dispatch("fetchUsers");
  await store.dispatch("fetchQuestions");
  router.replace("/questions");
  store.commit("clearUserAnswers");
};

// handler for 'Reset' button, reset game and go back to StartScreen
const onResetClick = () => {
    router.replace ("/");
    store.commit ("setUsername", "");
    store.commit ("setDifficulty", "");
    store.commit ("setCattegory", "");
    store.commit ("setAmount", 5);
    store.commit ("setCurrentQuestionIndex", 0);
    store.commit ("setScore", 0);
    store.commit ("clearUserAnswers");
    store.commit ("setUserId", "");
} 

</script>

<template>
<div class="resultsScreen">
    <div class="resultsContainer">
      <div class="totalScore">
        <h3>You scored</h3>
        <h1>{{ store.state.score }}</h1>
        <h3>points</h3>
      </div>
      <div class="result" v-for="item in userAnswers" :key="item">
        <p class="question">{{ htmlDecode(item.question) }}</p>
        <p class="correct">{{ htmlDecode(item.correct_answer) }}</p>
        <p>{{ htmlDecode(item.user_answer) }}</p>
      </div>
      <div class="buttonContainer">
        <div class="resultsButtons">
          <button class="resultButton" @click="onReplayClick">Replay</button>
          <button class="resultButton" @click="onResetClick">Reset</button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>

</style>