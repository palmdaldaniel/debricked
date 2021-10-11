
// simple state managemnt for components to share
export const store = {
  state: {
    useTheme: false,
  },
  updateTheme(value) {
    console.log(value)
    this.state.useTheme = value;
  },
};
