import AbstractComponent from "../abstract.component";
import {AddPrefix} from "../../shared.types";
import {uid} from "../../utils";

export type TodoListPropsNames = 'title'

export type TodoListDataPropsNames = AddPrefix<TodoListPropsNames, 'data-'>

export type TodoListProps = {
    [T in TodoListPropsNames]: string
}

export type TodoListItem = {
    text: string,
    status: string,
    id: string
}

export default class TodoListComponent extends AbstractComponent<TodoListProps> {
    private _items: Array<TodoListItem>

    private tasksContainer: null | HTMLElement;

    constructor() {
        super();
        this.tasksContainer = null
        this._items = []
    }


    private setStyles() {
        this.style.cssText = `
            display: flex;
            flex-direction: column;
            max-width: 100%;
            overflow: auto;
        `
    }

    #addTasksContainer() {
        this.tasksContainer = document.createElement('div')
        this.tasksContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            overflow: auto;
            height: 400px;
            max-height: 400px;
        `
        this.append(this.tasksContainer)
    }

    #addInput() {
        const fragment = document.createDocumentFragment()
        const input = document.createElement('input')
        const form = document.createElement('form')
        const submitButton = document.createElement('input')

        const self = this

        form.addEventListener('submit', function (e) {
            e.preventDefault()
            const input = this?.['todo-input']
            const value = input?.value
            if (value)
                self.add({
                    text: value,
                    status: 'TODO',
                    id: uid()
                })
            input.value = ''
        })

        input.setAttribute('type', 'text')
        input.setAttribute('name', 'todo-input')
        submitButton.setAttribute('type', 'submit')
        submitButton.setAttribute('value', 'Add')

        form.style.cssText = `
            display: flex;
            justify-content: space-between;
        `

        input.style.cssText = `
            flex: 1;
        `

        submitButton.style.cssText = `
            flex-shrink: 0;
        `

        form.append(input)
        form.append(submitButton)

        fragment.append(form)

        this.append(fragment)

    }

    override render(): void {
        this.innerHTML = ''
        this.#addHeader()
        this.setStyles()
        this.#addTasksContainer()
        this.#addInput()
        const fragment = document.createDocumentFragment()
        this._items.forEach(listItem => {
            const li = document.createElement('todo-item')
            this.passProps(li, listItem)
            fragment.append(li)
        })
        if (this.tasksContainer) {
            this.tasksContainer.innerHTML = ''
            this.tasksContainer.append(fragment)
        }
    }

    private passProps(node: HTMLElement, props: TodoListItem) {
        let key: keyof TodoListItem
        for (key in props) {
            node.setAttribute(`data-${key}` as TodoListDataPropsNames, props[key])
        }
    }

    #addHeader() {
        const fragment = document.createDocumentFragment()
        const header = document.createElement('todo-heading')
        header.setAttribute('data-title', this.props?.title || '')
        fragment.append(header)
        this.append(fragment)
    }

    #next(items: Array<TodoListItem>) {
        this._items = items.map((item => {
            item.id = (item.id) ? item.id : uid()
            return item
        }))
        this.render()
    }

    set items(items: Array<TodoListItem>) {
        this.#next(items)
    }

    /**
     * @property {string} item.text
     * @property {string} item.status DONE | IN_PROGRESS | TODO | CANCELLED
     * @property {string} item.id id of the component, generated automatically or can be passed
     * @returns {void}
     * */
    add(item: TodoListItem) {
        this.#next([...this._items, item])
    }

    delete(id: string | number) {
        const index = this._items.findIndex((el) => el.id === id)
        const items = this._items.slice()
        items.splice(index, 1)
        this.#next(items)
    }

    update(id: string | number, item: TodoListItem) {
        const index = this._items.findIndex((el) => el.id === id)
        this.#next(
            this._items.slice(0, index).concat(item).concat(this._items.slice(index + 1, this._items.length))
        )
    }

}
