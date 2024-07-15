///////////form prevent default para fazer

const pagina = document.getElementById('page')

async function getPosts() {
    //Fetch
    let response = await fetch('http://localhost:3000/posts');
    let data = await response.json();
    data = data.reverse()
    //Criar o Form
    const newPublish = document.createElement('div')
    newPublish.setAttribute('id', 'publish')
    pagina.appendChild(newPublish)

    const publish = document.getElementById('publish')

    const newForm = document.createElement('form')
    newForm.setAttribute('id', 'pinfo')
    publish.appendChild(newForm)

    const form = document.getElementById('pinfo')

    const newContent = document.createElement('input')
    newContent.setAttribute('type', 'text')
    newContent.setAttribute('id', 'content')
    form.appendChild(newContent)

    const content = document.getElementById('content')

    const newButton = document.createElement('input')
    newButton.setAttribute('type', 'submit')
    newButton.setAttribute('value', 'Publicar')
    newButton.setAttribute('id', 'enviar')
    form.appendChild(newButton)

    const button = document.getElementById('enviar')
    button.addEventListener('click', (e) => { e.preventDefault(); newPost(content.value) })

    //Criar o Feed
    const newFeed = document.createElement('div')
    newFeed.setAttribute('id', 'feed')
    pagina.appendChild(newFeed)

    const feed = document.getElementById('feed')
    feed.innerHTML += data.map((post) => {
        if (post.title) { return `<div onclick='getPostDetais(${post.id})' id=${post.id}><h1>${post.title}</h1></div> ` }
    }).join('')

}
async function getPostDetais(id) {
    //Fetch
    let response = await fetch(`http://localhost:3000/posts/${id}?_embed=comments`);
    let data = await response.json();
    //Div principal
    const newDiv = document.createElement('div')
    newDiv.setAttribute('id', 'post')


    //Remocao dos elementos antigos e adicao do novo elemento 
    const publish = document.getElementById('publish')
    const feed = document.getElementById('feed')
    pagina.removeChild(publish)
    pagina.removeChild(feed)
    pagina.appendChild(newDiv)

    //elemento do Titulo
    const post = document.getElementById('post')
    post.innerHTML = `<h1>${data.title}</h1> `

    //Elemento dos comentarios
    const addComments = document.createElement('div')
    addComments.setAttribute('id', 'comments')
    pagina.appendChild(addComments)

    const comments = document.getElementById('comments')
    comments.innerHTML = data.comments.map((comment) => `<p>${comment.text}</p>`).join('')

    //Elemento form de novo comentario


    //Icone para voltar ao inicio
    const newGoBack = document.createElement('i')
    newGoBack.setAttribute('class', 'material-symbols-outlined')
    newGoBack.setAttribute('id', 'arrow')
    newGoBack.innerHTML = 'arrow_back'
    newGoBack.addEventListener('click', fromGoBack)
    pagina.appendChild(newGoBack)

    //
    const deleteIcon = document.createElement('i')
    deleteIcon.setAttribute('class', 'material-symbols-outlined')
    deleteIcon.setAttribute('id', 'deleteIcon')
    deleteIcon.innerHTML = 'delete'
    deleteIcon.addEventListener('click', function () { deletePost(data) })
    pagina.appendChild(deleteIcon)



}

function fromGoBack() {
    pagina.removeChild(post)
    pagina.removeChild(comments)
    pagina.removeChild(arrow)
    pagina.removeChild(deleteIcon)
    getPosts()
}
function deletePost(data) {
    data.comments.forEach((comment) => { fetch(`http://localhost:3000/comments/${comment.id}`, { method: 'DELETE' }) })
    fetch(`http://localhost:3000/posts/${data.id}`, { method: 'DELETE' })
    pagina.removeChild(post)
    pagina.removeChild(comments)
    pagina.removeChild(arrow)
    pagina.removeChild(deleteIcon)
    getPosts()
}
async function newPost(title) {
    if (title) {
        let send = {
            title: title,
        }
        const response = await fetch('http://localhost:3000/posts', { method: 'POST', body: JSON.stringify(send), headers: { "Content-type": "application/json; charset=UTF-8" } })
        const data = await response.json()
        getPostDetais(data.id)
    }
}
getPosts()