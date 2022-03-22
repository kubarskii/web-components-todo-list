export default class TodoItemComponent extends HTMLElement {
    constructor() {
        super();
        this.props = {}
        this.shadow = null
        this.parent = null
    }

    connectedCallback() {
        this.parent = this.parentNode.parentNode
        this.#init()
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

        const taskContainer = document.createElement('div')
        const p = document.createElement('p')
        const inProgressButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        p.innerText = text
        deleteButton.textContent = 'Delete'
        inProgressButton.textContent = (status === 'IN_PROGRESS') ? 'To Do' : 'In Progress'

        taskContainer.append(p)
        taskContainer.append(deleteButton)
        taskContainer.append(inProgressButton)

        const style = document.createElement('style')
        style.textContent = `
            :host {
                user-select: none;
                cursor: pointer;
                display: flex;
                flex-wrap: wrap;
            }
            
            :host > div {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
            }
            
            :host p {
                flex: 1
            }
            
            :host([data-status="DONE"]) p {
                text-decoration: line-through;
            }
            
            :host([data-status="IN_PROGRESS"]) p {
                color: blue;
            }
        `

        const self = this

        deleteButton.addEventListener('click', function (e) {
            e.stopPropagation()
            self.parent.delete(id)
        })

        inProgressButton.addEventListener('click', function (e) {
            e.stopPropagation()
            const {status} = self.props
            if (status === 'IN_PROGRESS') {
                self.setTodo()
            } else {
                self.setInProgress()
            }
        })

        this.addEventListener('click', function () {
            const status = (self.props.status === 'DONE') ? 'TODO' : 'DONE'
            self.#updateStatus(status)
        })

        fragment.append(taskContainer)
        this.shadow.appendChild(style)
        this.shadow.appendChild(fragment)
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
