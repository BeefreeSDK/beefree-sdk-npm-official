


export const createBeePlugin = () => {
  const article = document.createElement('article')
  const header = document.createElement
  const pluginContainer = document.createElement('div')
  pluginContainer.setAttribute("id", "bee-plugin-container")
  pluginContainer.style.height = '40rem'
  article.appendChild(pluginContainer)
  // return article  
  return (
    <article>
      <div id="bee-plugin-container"></div>
    </article>
  )
}