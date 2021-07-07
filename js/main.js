import Task from "./models/Task.js";
import ListTask from "./models/ListTask.js";

const listTask = new ListTask();


const getEle = (id) => document.getElementById(id);

const renderToDo = (arr) => {
    let contentToDoHTML = "";
    let contentCompletedHTML = "";
    arr.forEach((item) => {
        //Kiểm tra trạng thái của activity để render vào bảng phù hợp
        if (item.stateTask === "0") {
            contentToDoHTML += `
        <li>
        <span>${item.nameTask}</span>
        <div class="buttons">
            <button onclick="deleteTask(${item.id})">
            <i class="fa fa-trash-alt remove"></i>                 
            </button>
            <button onclick="checkTodoTask(${item.id})">
            <i class="fa fa-check-circle complete"></i>
            </button>
       </div>        
        </li>
        `;
        } else if (item.stateTask === "1") {
            contentCompletedHTML += `
        <li>
        <span>${item.nameTask}</span>
        <div class="buttons">
            <button onclick="deleteTask(${item.id})">
            <i class="fa fa-trash-alt remove"></i>
            </button>
            <button onclick="checkCompletedTask(${item.id})" style="color:green">
            <i class="fa fa-check-circle complete"></i>
            </button>
        </div>        
        </li>
        `;
        }
        getEle("todo").innerHTML = contentToDoHTML;
        getEle("completed").innerHTML = contentCompletedHTML;
    });
    /*return arr.forEach((item) => {
        if(item.stateTask===0)
        return (contentHTML += `
        <li>  
        <span>${item.nameTask}</span>
            <div class="buttons">
                <button onclick="checkTask(${item.id})">
                    <i class="fa fa-check-circle complete"></i>
                </button>
                <button onclick="deleteTask(${item.id})">
                <i class="fa fa-trash-alt remove"></i>
                </button>
            </div>
        </li>
        `);
    }, "");*/
};

const fetchData = () => {
    listTask.getListTaskApi()
        .then((result) => {
            renderToDo(result.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

fetchData();

getEle("addItem").addEventListener("click", () => {
    const _nameTask = getEle("newTask").value;

    const task = new Task("", _nameTask, "0");//0 là chưa check

    listTask.addTaskApi(task)
        .then((result) => {
            alert("Add success!");
            fetchData();
        })
        .catch((err) => {
            console.log(err);
        });
});
window.addItem = addItem;

const deleteTask = (id) => {
    listTask.deleteTaskApi(id)
        .then((result) => {
            alert("Delete success!");
            fetchData();
        })
        .catch((err) => {
            console.log(err);
        })
};
window.deleteTask = deleteTask;

const checkTodoTask = (id) => {
    listTask.getTaskById(id)
        .then((result) => {
            let task = new Task(id, result.data.nameTask, "1");
            listTask.updateTaskById(task)
                .then((result) => {
                    fetchData();
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        });
};
window.checkTodoTask = checkTodoTask;

const checkCompletedTask = (id) => {
    listTask.getTaskById(id)
        .then((result) => {
            let task = new Task(id, result.data.nameTask, "0");
            listTask.updateTaskById(task)
                .then((result) => {
                    fetchData();
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
}
window.checkCompletedTask = checkCompletedTask;