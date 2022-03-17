<script setup>
import { computed, onBeforeMount, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { htmlDecode } from "../util/utils.js";

// declare vuex store and vue-router for use in the component
const store = useStore();
const router = useRouter();

// declare variables used by the template
const optionsArray = reactive([]);

// declare references to the questions and currentQuestionIndex
const questions = computed(() => store.state.questions);
const currentQuestionIndex = computed(() => store.state.currentQuestionIndex);

// event handler for the answer buttons
const onAnswerClick = (event) => {
  checkAnswer(event.target.value);
  // if there are questions left, show new questions and answers
  if (currentQuestionIndex.value < questions.value.length - 1) {
    store.commit("setCurrentQuestionIndex", currentQuestionIndex.value + 1);
    updateAnswers();
  } else {
    const userId = store.state.userId;
    const currentScore = store.state.score;
    const oldHighScore = store.getters.findUserHighScore;
    // update the API with the new score if it is higher than the old high score
    if (currentScore > oldHighScore) {
      store.dispatch("updateUserScore", userId, currentScore);
    }
    router.replace("/results");
  }
};

// create object that has data for current question and checks if answer is correct
const checkAnswer = (answer) => {
  const answerObject = {
    question: questions.value[currentQuestionIndex.value].question,
    correct_answer: questions.value[currentQuestionIndex.value].correct_answer,
    user_answer: answer,
  };
  store.commit("setUserAnswers", answerObject);

  // if the answer is correct, add 10 points
  if (answer === questions.value[currentQuestionIndex.value].correct_answer) {
    store.commit("setScore", store.state.score + 10);
  }
};

// before render of template, populate answer area
onBeforeMount(() => {
  updateAnswers();
});

// clear answers array and fill with answers for current question
const updateAnswers = () => {
  while (optionsArray.length > 0) {
    optionsArray.pop();
  }
  optionsArray.push(questions.value[currentQuestionIndex.value].correct_answer);
  optionsArray.push(
    ...questions.value[currentQuestionIndex.value].incorrect_answers
  );
  shuffleAnswers();
};

// shuffle order of questions
const shuffleAnswers = () => {
  for (let i = optionsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
  }
};
</script>

<template>
  <div class="questionScreen screen">
    <div class="question">
      <h3>
        {{
          htmlDecode(
            store.state.questions[store.state.currentQuestionIndex].question
          )
        }}
      </h3>
    </div>
    <div class="answerContainer">
      <div
        class="answerOptions"
        v-for="item in optionsArray"
        :key="currentQuestionIndex + item"
      >
        <button class="answerButton" :value="item" @click="onAnswerClick">
          {{ htmlDecode(item) }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.questionScreen {
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 5px 6px rgba(0, 0, 0, 0.23);
  width: 60%;
  margin-left: 20%;
  min-height: 700px;
}

.question {
  margin: 100px 0;
}

.answerContainer {
  bottom: 0;
}

.answerButton {
  width: 80%;
  min-height: 50px;
  font-size: 30px;
  border-radius: 15px;
  margin: 20px;
}

.answerButton:hover {
  background-color: rgba(0, 0, 0, 0.432);
  cursor: pointer;
}
</style>