export {getTemplateFromHtmlString} from './template'

export const uid = () => {
    return Math.random().toString().slice(2, 10)
}
