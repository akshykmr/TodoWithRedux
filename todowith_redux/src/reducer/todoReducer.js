const initialState = {
    list: []
};

const totoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADDTODO':  
            const { data, id, date } = action.payload;
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: id,
                        data: data,
                        date: date
                    }
                ]
            };
        case 'UPDATE':
            const { data: updatedData } = action.payload; 
            // console.log("updating",updatedData)
            const updatedList = state.list.map(item => {
            // console.log(item.id, updatedData.id)
                if (item.id === updatedData.id) {
                    return {
                        ...item,
                        data: updatedData.data,
                    };
                }
                return item;
            });
            return {
                ...state,
                list: updatedList
            };

        case 'DELETETODO':  
            const newList = state.list.filter((elem)=> elem.id !== action.id)
            return {
                ...state,
                list: newList
            };

        case 'REMOVEALLTODO':  
            return {
                ...state,
                list: []
            };

        default:
            return state;
    }
};

export default totoReducer;
