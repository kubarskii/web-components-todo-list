import AbstractComponent from "../abstract.component";

export default class TodoHeadingComponent extends AbstractComponent {
    constructor() {
        super();
    }

    override render() {
        debugger
        const {title} = this.props!

        const shadow = this.attachShadow({mode: 'open'})

        const fragment = document.createDocumentFragment()
        const header = document.createElement('h2')

        header.innerText = String(title)

        fragment.append(header)
        shadow.append(fragment)

    }
}
