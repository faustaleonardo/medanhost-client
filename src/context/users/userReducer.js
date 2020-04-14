export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case 'SET_USERS':
      return { ...state, users: payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, payload] };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== payload),
      };
    default:
      return state;
  }
};
