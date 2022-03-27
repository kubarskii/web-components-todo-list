import template from './templates/todo-item.template.html'
import {getTemplateFromHtmlString} from '../../utils'
import AbstractComponent from "../abstract.component";
import TodoListComponent from "../todo-list/todo-list.component";
import {AddPrefix} from "../../shared.types";

export type TodoItemPropsNames = 'id' | 'status' | 'text'

export type TodoItemDataPropsNames = AddPrefix<TodoItemPropsNames, 'data-'>

export type TodoItemProps = {
    [T in TodoItemPropsNames]: string
}

export default class TodoItemComponent extends AbstractComponent<TodoItemProps> {
    private shadow: null | ShadowRoot;
    private parent: null | TodoListComponent;
    private template: null | HTMLTemplateElement;

    constructor() {
        super();
        this.shadow = null
        this.parent = null
        this.template = null
    }

    override didMount() {
        this.parent = this.parentNode?.parentNode as TodoListComponent
        this.loadTemplate()
    }

    loadTemplate() {
        this.template = getTemplateFromHtmlString(template);
    }

    setCancelled() {
        this.#updateStatus('CANCELLED')
    }

    setInProgress() {
        this.#updateStatus('IN_PROGRESS')
    }

    setDone() {
        this.#updateStatus('DONE')
    }

    setTodo() {
        this.#updateStatus('TODO')
    }

    #updateStatus(status: string) {
        this.setAttribute('data-status', status)
        if (this.parent && this.props?.id)
            this.parent.update(this.props.id, {
                ...this.props,
                status
            })
    }

    override render() {
        debugger
        const {text, id, status} = this.props!

        const fragment = document.createDocumentFragment()
        this.shadow = this.attachShadow({mode: 'open'})
        const taskContainer = document.createElement('span')
        const buttonTitle = document.createElement('span')

        taskContainer.setAttribute('slot', 'task')
        buttonTitle.setAttribute('slot', 'action-button')

        taskContainer.textContent = text
        buttonTitle.textContent = (status === 'IN_PROGRESS') ? 'To Do' : 'In Progress'

        this.append(taskContainer)
        this.append(buttonTitle)

        const node = this.template?.content?.cloneNode(true) || document.createElement('div')

        this.shadow.appendChild(node)
        this.shadow.append(fragment)

        this.addEventListener('click', () => {
            const {status} = this.props!
            if (status === 'DONE')
                this.setInProgress()
            else
                this.setDone()
        })

        this.shadow?.querySelector('.action')?.addEventListener('click', (e) => {
            e.stopPropagation()
            const {status} = this.props!
            if (status === 'IN_PROGRESS') {
                this.setTodo()
            } else {
                this.setInProgress()
            }
        })

        this.shadow?.querySelector('.delete')?.addEventListener('click', (e) => {
            e.stopPropagation()
            if (this.parent)
                this.parent.delete(id)
        })
    }

}
