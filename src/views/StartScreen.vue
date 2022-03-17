<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// declare vuex store and vue-router for use in the component
const store = useStore();
const router = useRouter();

// declare variables used by the template
const username = ref("");
const amount = ref(5);
const difficulty = ref("");
const category = ref("");
const toggleOptions = ref(false);

// declare a reference to the users state
const users = computed(() => store.state.users);

// upon pressing the 'Start' button, update the store states and switch to the QuestionScreen route
const onStartClick = async () => {
  store.commit("setUsername", username.value);
  store.commit("setAmount", amount.value);
  store.commit("setDifficulty", difficulty.value);
  store.commit("setCategory", category.value);
  const user = store.getters.findUserByUsername;
  // if the API didn't have a user with the same username, create a new one
  if (!user) {
    await store.dispatch("addNewUser");
    await store.dispatch("fetchUsers");
  } else {
    store.commit("setUserId", user.id);
  }
  // fetch appropriate questions depending on user input
  await store.dispatch("fetchQuestions");
  router.replace("/questions");
};

// fetch the category and user data from the APIs when the component is mounted
onMounted(async () => {
  await store.dispatch("fetchCategories");
  await store.dispatch("fetchUsers");
});
</script>

<template>
  <div class="startScreen screen">

    <p class="startHeader">Welcome to the trivia game</p>

    <input
      type="text"
      class="startInput"
      placeholder="Player name"
      v-model="username"
    />

    <br />

    <button @click="toggleOptions = !toggleOptions" class="optionsButton">
      Options
    </button>

    <button @click="onStartClick" class="startButton">Start</button>

    <div v-show="toggleOptions" class="options">
      <select class="option" v-model="difficulty">
        <option disabled value="">Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <input type="number" class="option" v-model="amount" min="1" max="50" />
      <div>
        <p class="invalidValue" v-show="amount < 1">Select min 1 question</p>
        <p class="invalidValue" v-show="amount > 50">Select max 50 questions</p>
      </div>
      <select v-model="category" class="option">
        <option disabled value="">Category</option>
        <option
          v-for="item in store.state.categories"
          :key="item.id"
          :value="item.id"
        >
        {{ item.name }}
        </option>
      </select>
    </div>

    <p class="startFooter">This app is made by Murat Sahin and Timothy Blom.</p>

  </div>
</template>

<style scoped>
.startScreen {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 5px 6px rgba(0, 0, 0, 0.23);
    padding: 100px 0;
    width: 60%;
    margin-left: 20%;
    min-height: 500px;
}

.startHeader {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 75px;
}

.startFooter {
  font-size: 15px;
  text-align: left;
  margin-left: 100px;
  margin-top: 200px;
}

.startInput {
    width: 400px;
    height: 75px;
    border-radius: 5px;
    font-size: 30px;
    padding-left: 10px;
}

.optionsButton, .startButton {
    width: 150px;
    height: 50px;
    font-size: 30px;
    border-radius: 15px;
    margin: 20px;
}

.optionsButton:hover, .startButton:hover {
  background-color: rgba(0, 0, 0, 0.432);
  cursor: pointer;
}

.options {
    display: flex;
    justify-content: center;

}

.option {
    width: 100px;
    height: 30px;
    font-size: 20px;
    margin: 10px;
    border-radius: 5px;
}
</style>