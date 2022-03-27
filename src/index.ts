(async function () {
    const TodoListComponent = await import("./components/todo-list/todo-list.component")
    const TodoHeadingComponent = await import("./components/todo-heading/todo-heading.component")
    const TodoItemComponent = await import("./components/todo-item/todo-item.component")
    customElements.define('todo-list', TodoListComponent.default)
    customElements.define('todo-heading', TodoHeadingComponent.default)
    customElements.define('todo-item', TodoItemComponent.default)
})()
