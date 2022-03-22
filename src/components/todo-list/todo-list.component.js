export default class TodoListComponent extends HTMLElement {
    #items

    constructor() {
        super();
        this.props = {}
        this.tasksContainer = null
        this.#items = []
        this.#init()
    }

    #init() {
        this.#setStyles()
        this.#setProps()
        this.#addHeader()
        this.#addTasksContainer()
        this.#addInput()
    }

    #setStyles() {
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

    uid(){
        return Math.random().toString().slice(2, 10)
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
            const uid = self.uid()
            if (value)
                self.add({
                    text: value,
                    status: 'TODO',
                    id: uid
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

    #setProps() {
        const props = {}
        Object.entries(this.dataset).forEach(([key, value]) => {
            props[key] = value
        })
        this.props = props
    }

    #render(items) {
        const fragment = document.createDocumentFragment()
        this.#items.forEach(listItem => {
            const li = document.createElement('todo-item')
            this.#passProps(li, listItem)
            fragment.append(li)
        })
        this.tasksContainer.innerHTML = ''
        this.tasksContainer.append(fragment)
    }

    #passProps(node, props) {
        for (let key in props) {
            if (props.hasOwnProperty(key))
                node.setAttribute(`data-${key}`, props[key])
        }
    }

    #addHeader() {
        const fragment = document.createDocumentFragment()
        const header = document.createElement('todo-heading')
        header.setAttribute('data-title', this.props.title || '')
        fragment.append(header)
        this.append(fragment)
    }

    #next(items) {
        this.#items = items.map((item => {
            item.id = (item.id) ? item.id : this.uid()
            return item
        }))
        this.#render()
    }

    set items(items) {
        this.#next(items)
    }

    /**
     * @property {string} item.text
     * @property {string} item.status DONE | IN_PROGRESS | TODO | CANCELLED
     * @property {string} item.id id of the component, generated automatically or can be passed
     * @returns {void}
     * */
    add(item) {
        this.#next([...this.#items, item])
    }

    delete(id) {
        const index = this.#items.findIndex((el) => el.id === id)
        const items = this.#items.slice()
        items.splice(index, 1)
        this.#next(items)
    }

    update(id, item) {
        const index = this.#items.findIndex((el) => el.id === id)
        this.#next(
            this.#items.slice(0, index).concat(item).concat(this.#items.slice(index + 1, this.#items.length))
        )
    }

}
