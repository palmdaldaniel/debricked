/**
 *  A  more simple setup for global state management than with vuex.
 * Will be used for keeping track of active theme and shared data between components
 *  */

import { reactive } from "vue";

// vue.observable creates a reactive state that can be used inside the app's components.

// store/loggedInUser.js

// state

export const store = {
  state: reactive({
    name: "daniel",
    useTheme: false,
  }),

  addNumber(newNumber) {
    this.state.numbers.push(newNumber);
  },
};

/* 
mounted() {
    const jsonValue = localStorage.getItem("theme");
    const theme = JSON.parse(jsonValue);
    this.useTheme = theme;
  },
  watch: {
    useTheme: function (newValue) {
      localStorage.setItem("theme", newValue);
    },
  }, */