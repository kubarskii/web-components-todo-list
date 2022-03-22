export default class TodoHeadingComponent extends HTMLElement {
    constructor() {
        super();
        this.props = {}
    }

    connectedCallback() {
        this.#setProps()
        this.#init()
    }

    #init(){
        const {title} = this.props

        const shadow = this.attachShadow({ mode: 'open' })

        const fragment = document.createDocumentFragment()
        const header = document.createElement('h2')

        header.innerText = title

        fragment.append(header)
        shadow.append(fragment)

    }

    #setProps() {
        const props = {}
        Object.entries(this.dataset).forEach(([key, value]) => {
            props[key] = value
        })
        this.props = props
    }

}
