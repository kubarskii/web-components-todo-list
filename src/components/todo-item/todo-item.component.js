import template from './templates/todo-item.template.html'
import {getTemplateFromHtmlString} from '../../utils/index'

export default class TodoItemComponent extends HTMLElement {
    constructor() {
        super();
        this.props = {}
        this.shadow = null
        this.parent = null
        this.template = null
    }

    connectedCallback() {
        this.parent = this.parentNode.parentNode
        this.loadTemplate()
        this.#init()
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

    #updateStatus(status) {
        this.setAttribute('data-status', status)
        this.parent.update(this.props.id, {
            ...this.props,
            status
        })
    }

    #render() {
        const {text, id, status} = this.props

        const fragment = document.createDocumentFragment()
        this.shadow = this.attachShadow({mode: 'open'})
        const taskContainer = document.createElement('span')
        const buttonTitile = document.createElement('span')

        taskContainer.setAttribute('slot', 'task')
        buttonTitile.setAttribute('slot', 'action-button')

        taskContainer.textContent = text
        buttonTitile.textContent = (status === 'IN_PROGRESS') ? 'To Do' : 'In Progress'

        this.append(taskContainer)
        this.append(buttonTitile)

        this.shadow.appendChild(this.template.content.cloneNode(true))
        this.shadow.append(fragment)
        this.shadow.querySelector('.action').addEventListener('click', (e) => {
            e.stopPropagation()
            const {status} = this.props
            if (status === 'IN_PROGRESS') {
                this.setTodo()
            } else {
                this.setInProgress()
            }
        })

        this.shadow.querySelector('.delete').addEventListener('click', (e) => {
            e.stopPropagation()
            this.parent.delete(id)
        })
    }

    #init() {
        this.#setProps()
        this.#render()
    }

    #setProps() {
        const props = {}
        Object.entries(this.dataset).forEach(([key, value]) => {
            props[key] = value
        })
        this.props = props
    }

}
