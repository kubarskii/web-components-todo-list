export default abstract class AbstractComponent<T extends object = Record<string, string>> extends HTMLElement {
    protected props: T | null = null

    protected constructor() {
        super();
    }

    render(): void {
    }

    didMount(): void {
    }

    didUpdate(_name: string, _oldValue: string, _newValue: string): void {
    }

    didDestroyed(): void {
    }

    connectedCallback() {
        this.updateProps()
        this.didMount()
        this.render()
    }

    disconnectedCallback() {
        this.didDestroyed()
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        this.updateProps()
        this.didUpdate(name, oldValue, newValue)
    }

    adoptedCallback() {
        this.render()
    }

    private updateProps() {
        this.props = Object.assign({}, {...this.dataset} as T)
    }


}
