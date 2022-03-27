export const getTemplateFromHtmlString = (htmlString: string) => {
    const template = document.createElement('template')
    template.innerHTML = htmlString
    return template
}
