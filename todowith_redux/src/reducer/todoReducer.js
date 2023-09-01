

const initialState = {
  list: [],
};

const totoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDTODO":
      const { todo, id, addedDate } = action.payload;
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            todo: todo,
            date: addedDate,
            status: "Pending",
          },
        ],
      };
    case "UPDATE":
      const { data: updatedData } = action.payload; 
      const updatedList = state.list.map((item) => {
        if (item.id === updatedData.id && item.date === updatedData.date) {
          return {
            ...item,
            todo: updatedData.todo,
            status: updatedData.status, // Add the status field
          };
        }
        return item;
      });
      return {
        ...state,
        list: updatedList,
      };

    case "DELETETODO":
      const newList = state.list.filter((elem) => elem.id !== action.id);
      return {
        ...state,
        list: newList,
      };

    case "REMOVEALLTODO":
      let listAfterDel = state.list;
      for (let i = 0; i < action.id.length; i++) {
        listAfterDel = listAfterDel.filter((elem) => elem.id !== action.id[i]);
      }

      return {
        ...state,
        list: listAfterDel, 
      };

    default:
      return state;
  }
};

export default totoReducer;
