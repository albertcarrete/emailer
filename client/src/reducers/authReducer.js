// - records whether or not the user is logged in
// - our state needs an initial state
export default function(state = {}, action) {
  console.log(action);
  switch (action.type) {
    default:
      return state;
  }
}
