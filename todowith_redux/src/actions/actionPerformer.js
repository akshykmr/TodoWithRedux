export const addTodo = (data) =>{

    var addedDate = new Date();
    var day = addedDate.getDate();
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var month = monthNames[addedDate.getMonth()];
    var year = addedDate.getFullYear();
    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
    var suffix = getOrdinalSuffix(day);
    var formattedDate = day + suffix + ' ' + month + ' ' + year;
    
    // const formattedDate = `${year}-${month}-${day}`;

    return {
        type : "ADDTODO",
        payload : {
            id : new Date().getTime().toString(),
            todo: data,
            addedDate:formattedDate,
        }
    }
};

export const updateList = (data) =>{

    return {
        type : "UPDATE",
        payload : {
            data: data
        }
    }
};

export const deleteTodo = (id) =>{
    return {
        type : "DELETETODO",
        id:id
    }
};

export const removeAllTodo = (id) =>{
    // console.log(id)
    return {
        type : "REMOVEALLTODO",
        id:id
    }
};
