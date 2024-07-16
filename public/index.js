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
    newForm.setAttribute('class', 'card')
    publish.appendChild(newForm)

    const form = document.getElementById('pinfo')

    const newContent = document.createElement('input')
    newContent.setAttribute('type', 'text')
    newContent.setAttribute('id', 'content')
    newContent.setAttribute('class', 'input')
    form.appendChild(newContent)

    const content = document.getElementById('content')

    const newButton = document.createElement('input')
    newButton.setAttribute('type', 'submit')
    newButton.setAttribute('value', 'Publicar')
    newButton.setAttribute('id', 'enviar')
    newButton.setAttribute('class', 'button')
    form.appendChild(newButton)

    const button = document.getElementById('enviar')
    button.addEventListener('click', (e) => { e.preventDefault(); newPost(content.value) })

    //Criar o Feed
    const newFeed = document.createElement('div')
    newFeed.setAttribute('id', 'feed')
    pagina.appendChild(newFeed)

    const feed = document.getElementById('feed')
    feed.innerHTML += data.map((post) => {
        if (post.title) { return `<div class='card'onclick='getPostDetais(${post.id})' id=${post.id}><p>${post.title}</p></div> ` }
    }).join('')

}
async function getPostDetais(id) {
    //Fetch
    let response = await fetch(`http://localhost:3000/posts/${id}`);
    let data = await response.json();
    //Div principal
    const newDiv = document.createElement('div')
    newDiv.setAttribute('id', 'post')
    newDiv.setAttribute('class', 'card')


    //Remocao dos elementos antigos e adicao do novo elemento 
    const publish = document.getElementById('publish')
    const feed = document.getElementById('feed')
    pagina.removeChild(publish)
    pagina.removeChild(feed)
    pagina.appendChild(newDiv)

    //elemento do Titulo
    const post = document.getElementById('post')
    post.innerHTML = `<p>${data.title}</p> `




    //Icone para voltar ao inicio
    const newGoBack = document.createElement('i')
    newGoBack.setAttribute('class', 'material-symbols-outlined button left')
    newGoBack.setAttribute('id', 'arrow')
    newGoBack.innerHTML = 'arrow_back'
    newGoBack.addEventListener('click', fromGoBack)
    pagina.appendChild(newGoBack)



    //icone delete
    const deleteIcon = document.createElement('i')
    deleteIcon.setAttribute('class', 'material-symbols-outlined button right')
    deleteIcon.setAttribute('id', 'deleteIcon')
    deleteIcon.innerHTML = 'delete'
    deleteIcon.addEventListener('click', function () { deletePost(data) })
    pagina.appendChild(deleteIcon)

    //icone edit
    const editIcon = document.createElement('i')
    editIcon.setAttribute('class', 'material-symbols-outlined button right')
    editIcon.setAttribute('id', 'editIcon')
    editIcon.innerHTML = 'edit'
    editIcon.addEventListener('click', clicked = () => { editPost(data) })
    pagina.appendChild(editIcon)



}

function fromGoBack() {
    pagina.removeChild(post)
    pagina.removeChild(arrow)
    pagina.removeChild(editIcon)
    pagina.removeChild(deleteIcon)
    getPosts()
}

function deletePost(data) {
    fetch(`http://localhost:3000/posts/${data.id}`, { method: 'DELETE' })
    pagina.removeChild(post)
    pagina.removeChild(arrow)
    pagina.removeChild(editIcon)
    pagina.removeChild(deleteIcon)
    getPosts()
}
function editPost(data) {
    editIcon.removeEventListener("click", clicked);
    post.firstChild.setAttribute('contenteditable', 'true')
    post.firstChild.setAttribute('style', 'border: 1px solid #ccc')
    editIcon.innerHTML = 'check'
    post.firstChild.focus()
    console.log()
    editIcon.addEventListener('click', done = () => {
        fetch(`http://localhost:3000/posts/${data.id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: data.id, title: post.firstChild.textContent })
            }).then(fromGoBack())
    })
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