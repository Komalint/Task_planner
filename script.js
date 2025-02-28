const mainTodoArea = document.querySelector('.todo-list-elem');
const inputValue = document.getElementById("inputVal");



const getList = () => {
     return JSON.parse(localStorage.getItem("TodoItems"));

}
let localTodoLists = getList() || [] ;
/////////
const addtodoListLocalonDelete = (localTodoLists)=> {
    return localStorage.setItem("TodoItems" , JSON.stringify(localTodoLists));
}
////////




const addTodoOnLoad = (currelement) =>{
    const divElem = document.createElement("div");
    divElem.classList.add("main_todo_div");

    divElem.innerHTML= `<i class="fa-solid fa-check"></i> <li>${currelement}</li><button class="deleteBtn">Delete</button>`;
    mainTodoArea.append(divElem);
}

const addTodoList = (e) => {

    e.preventDefault();    
    const todoListValue = inputValue.value.trim();

    
    if( todoListValue != "" && !localTodoLists.includes(todoListValue))
    {
    localTodoLists.push(todoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    //console.log(localTodoLists);

    localStorage.setItem("TodoItems", JSON.stringify(localTodoLists));

    addTodoOnLoad(todoListValue);

    inputValue.value = ""; 
    }
    else
    inputValue.value = ""; 
};

//show todo list items on refresh
const showTodoList = () =>{
    localTodoLists.forEach(currelement => {
        addTodoOnLoad(currelement);
    });
};

showTodoList();

// remove data
const removeElem = (e) =>{
     
     const todotoRemove = e.target;
     let todoDltItem =  todotoRemove.previousElementSibling.textContent;
     //console.log(todoDltItem);

     let parentElem = todotoRemove.parentElement;

     localTodoLists = localTodoLists.filter((currelement) =>{
        return currelement != todoDltItem.toLowerCase();
     })

     
    addtodoListLocalonDelete(localTodoLists); 
    console.log(localTodoLists);
    parentElem.remove();
    
}

mainTodoArea.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains("deleteBtn")){
        removeElem(e);
    }
}
) ;


document.querySelector("#addBtn").addEventListener('click', (e) =>{
    addTodoList(e);    
}) ;