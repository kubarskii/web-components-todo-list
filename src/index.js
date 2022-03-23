import('./components/todo-list/todo-list.component')
    .then(async (TodoListComponent) => {
        customElements.define('todo-list', TodoListComponent.default)
        const TodoHeadingComponent = await import('./components/todo-heading/todo-heading.component')
        customElements.define('todo-heading', TodoHeadingComponent.default)
        const TodoItemComponent = await import('./components/todo-item/todo-item.component')
        customElements.define('todo-item', TodoItemComponent.default)
    })
