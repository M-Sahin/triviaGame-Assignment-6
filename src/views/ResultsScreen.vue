<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { htmlDecode } from "../util/utils.js";

</script>

<template>

</template>

<style scoped>
.resultScreen {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 5px 6px rgba(0, 0, 0, 0.23);
    padding: 100px 0;
    width: 60%;
    margin-left: 20%;
    min-height: 500px;
}

.toStartButton {
    width: 150px;
    height: 50px;
    font-size: 30px;
    border-radius: 15px;
    margin: 20px;
}

.playerScore {

}

.playerHighscore {

}

.questionsResultsContainer {

}

.questionResults {

}

.questionText {

}

.questionCorrectAnswer {

}

.questionPlayerAnswer {

}

#correctAnswer {
    color: green;
}

#correctAnswer::after {
    content: "+10 Points";
    color: green;
}
</style>