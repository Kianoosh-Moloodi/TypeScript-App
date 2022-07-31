import Swal from "sweetalert2";
import { TodoInterface } from "../interfaces/TodoInterface"
import UI from "./UI";

class Store {
    static getTodos(): TodoInterface[] {
        let todos: TodoInterface[];

        if (localStorage.getItem("todos")) {
            todos = JSON.parse(localStorage.getItem("todos")!);
        } else {
            todos = [];
        }

        return todos;
    }

    static displayTodos() {
        const todos = Store.getTodos();

        const ui = new UI();

        todos.forEach((todo) => {
            ui.addTodoToList(todo);
        });
    }

    static addTodo(todo: TodoInterface) {
        const todos = Store.getTodos();
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    static removeTodo(id: number) {
        const todos = Store.getTodos();
        const newTodos = todos.filter((todo) => todo.id !== id);

        localStorage.setItem("todos", JSON.stringify(newTodos));
    }

    static changeStatusTodo(id: number) {
        const todos = Store.getTodos();
        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, status: !todo.status } : todo
        );

        localStorage.setItem("todos", JSON.stringify(newTodos));

        Swal.fire({
            title: "Status Done/Undone",
            icon: "success",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000,
            toast: true,
            position: 'top',
        })
    }
}

export default Store;