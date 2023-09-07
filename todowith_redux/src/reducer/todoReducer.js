
// Define the initial state
const initialState = {
  list: [],
};

// Retrieve data from local storage or use the initial state
const storedState = localStorage.getItem('reduxState');
const initialStateWithStorage = storedState ? JSON.parse(storedState) : initialState;

// Define the reducer function
const totoReducer = (state = initialStateWithStorage, action) => {
  switch (action.type) {
    case "ADDTODO":
      // ... (your ADDTODO logic)

      // Update the state
      const newStateAfterAdd = {
        ...state,
        list: [
          ...state.list,
          {
            id: action.payload.id,
            todo: action.payload.todo,
            date: action.payload.addedDate,
            status: 'Pending',
          },
        ],
      };

      // Store the updated state in local storage
      localStorage.setItem('reduxState', JSON.stringify(newStateAfterAdd));

      return newStateAfterAdd;

      case "UPDATE":
      // ... (your UPDATE logic)

      // Update the state
      const updatedList = state.list.map((item) => {
        if (item.id === action.payload.data.id && item.date === action.payload.data.date) {
          return {
            ...item,
            todo: action.payload.data.todo,
            status: action.payload.data.status,
          };
        }
        return item;
      });

      const newStateAfterUpdate = {
        ...state,
        list: updatedList,
      };

      // Store the updated state in local storage
      localStorage.setItem('reduxState', JSON.stringify(newStateAfterUpdate));

      return newStateAfterUpdate;

      case "DELETETODO":
      // ... (your DELETETODO logic)

      // Update the state
      const updatedListAfterDelete = state.list.filter((elem) => elem.id !== action.id);

      const newStateAfterDelete = {
        ...state,
        list: updatedListAfterDelete,
      };

      // Store the updated state in local storage
      localStorage.setItem('reduxState', JSON.stringify(newStateAfterDelete));

      return newStateAfterDelete;

      case "REMOVEALLTODO":
      // ... (your REMOVEALLTODO logic)

      // Update the state
      let updatedListAfterRemoveAll = state.list;
      for (let i = 0; i < action.id.length; i++) {
        updatedListAfterRemoveAll = updatedListAfterRemoveAll.filter((elem) => elem.id !== action.id[i]);
      }

      const newStateAfterRemoveAll = {
        ...state,
        list: updatedListAfterRemoveAll,
      };

      // Store the updated state in local storage
      localStorage.setItem('reduxState', JSON.stringify(newStateAfterRemoveAll));

      return newStateAfterRemoveAll;

    default:
      return state;
  }
};

export default totoReducer;
