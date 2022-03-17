<script setup>
import { computed, onUpdated } from "vue";
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
};

</script>

<template>
<div class="resultsScreen screen">
    <div class="resultsContainer">
      <div class="totalScore">
        <p>You scored</p>
        <p>{{ store.state.score }}</p>
        <p> points</p>
      </div>
      <div class="resultHeader">
        <p class="questionHeader">Question:</p>
        <p class="correctHeader">Correct answer:</p>
        <p class="selectedHeader">Your answer:</p>
      </div>
      <div class="result" v-for="item in userAnswers" :key="item">
        <p class="question">{{ htmlDecode(item.question) }}</p>
        <p class="correct">{{ htmlDecode(item.correct_answer) }}</p>
        <p class="selected">{{ htmlDecode(item.user_answer) }}</p>
      </div>
      <div class="buttonContainer">
        <div class="resultsButtons">
          <button class="replayButton" @click="onReplayClick">Replay</button>
          <button class="resetButton" @click="onResetClick">Reset</button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.resultsScreen {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 5px 6px rgba(0, 0, 0, 0.23);
    padding: 100px 0;
    width: 60%;
    margin-left: 20%;
    min-height: 500px;
    margin-bottom: 100px;
}

.replayButton, .resetButton {
    width: 150px;
    height: 50px;
    font-size: 30px;
    border-radius: 15px;
    margin: 20px;
}

.replayButton:hover, .resetButton:hover {
  background-color: rgba(0, 0, 0, 0.432);
  cursor: pointer;
}

.totalScore {
  display: flex;
  width: 80%;
  margin-left: 10%;
  justify-content: center;
  font-size: 50px;
  font-weight: bolder;
  margin-bottom: 50px;
}

.totalScore p {
  margin: 5px;
}

.resultHeader {
  display: flex;
  justify-content: center;
  width: 80%;
  margin-left: 10%;
  margin-bottom: -25px;
}

.questionHeader {
  width: 40%;
  font-weight: bold;
}

.correctHeader {
  width: 25%;
  margin-left: 5%;
  font-weight: bold;
}

.selectedHeader {
  width: 25%;
  margin-left: 5%;
  font-weight: bold;
}

.result {
  width: 90%;
  margin: 50px 0 50px 5%;
  display: flex;
  justify-content: center;
  border-bottom: solid 3px rgba(0, 0, 0, 0.267)
}

.question {
  width: 40%;
  text-align: left;
}

.correct {
  width: 25%;
  margin-left: 5%;
}

.selected {
  width: 25%;
  margin-left: 5%;
}

#correctAnswer {
    color: green;
}

#correctAnswer::after {
    content: " +10 Points";
    color: green;
    font-size: 20px;
    position: static;
}
</style>