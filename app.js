import { posts, users } from "./bd.js"

const userRow = document.getElementById('users')
const formHtml = document.getElementById('form')
const select = document.getElementById('listUsers');
const cancelForm = document.getElementById('cancel-form');
const postsDiv = document.getElementById('user-posts')

//Inputs 
let id;
const nameInput = document.getElementById('name')
const usernameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const webpageInput = document.getElementById('webpage')
const ageInput = document.getElementById('age')

class Users {
    constructor() {
        this.data = users
    }

    add(newUser) {
        this.data = [...this.data, newUser]
    }

    search(id) {
        return this.data.find((user) => user.id == id)
    }

    list() {
        return this.data
    }
}

class Posts {
    constructor() {
        this.data = posts
    }

    add(newPosts) {
        this.data = [...this.data, newPosts]
    }

    search(userId) {
        return this.data.filter((posts) => posts.userId == userId)
    }

}

const postsClass = new Posts;

const usersClass = new Users();

class UI {
    showUsers() {
        this.cleanHTML(userRow)

        let users = usersClass.list();


        users.forEach(user => {
            const cell = document.createElement('tr')

            cell.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.website}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
            `
            userRow.appendChild(cell)
        })
    }

    cleanHTML(container) {
        while(container.firstChild) {
            container.removeChild(container.firstChild)
        }
    }

    showUsersOnSelect() {
        this.cleanHTML(select)

        console.log(select)
        let users = usersClass.list();

        users.forEach(user => {
            select.innerHTML += `<option value="${user.id}">${user.username}</option>`
        })


    }

    search(userId) {

        const user = usersClass.search(userId)

        if(user) {
            nameInput.value = user.name
            usernameInput.value = user.username
            emailInput.value = user.email
            webpageInput.value = user.website | ''
            ageInput.value = user.age
        }

        Array.from(formHtml.elements).forEach(formElement => formElement.disabled = true );

        cancelForm.disabled = false

    }

    showPosts(userId) {

        this.cleanHTML(postsDiv)
        let userPosts = postsClass.search(userId)

        userPosts.forEach(post => {
            postsDiv.innerHTML += `
            <div class="uk-card uk-card-default uk-card-small uk-card-body uk-card-hover">
                <h3 class="uk-card-title">${post.title}</h3>
                <p>${post.body}</p>
            </div>
            
            `
        })
    }

}


const ui = new UI;
ui.showUsers()
ui.showUsersOnSelect()
class Form {

    submit(e) {
        console.log(e)
        e.preventDefault();

        if(!id) {
            usersClass.list().forEach( user => {
                id = user.id
            })
        }

        id++

        const name = nameInput.value
        const username = usernameInput.value
        const email = emailInput.value
        const website = webpageInput.value
        const age = ageInput.value

        const userObj = {
            id,
            name,
            username,
            email,
            website,
            age
        }

        usersClass.add(userObj)
        console.log(userObj)
        console.log(usersClass.list())
        ui.showUsers()

    }
}

const form = new Form;



function eventListeners() {
    formHtml.addEventListener('submit', function(e) {
        form.submit(e)
        ui.showUsersOnSelect()
    } )

    select.addEventListener('change', function(e) {
        ui.search(e.target.value)
        ui.showPosts(e.target.value)
    })

    cancelForm.addEventListener('click', function(e) {
        nameInput.value = ''
        usernameInput.value = ''
        emailInput.value = ''
        webpageInput.value =  ''
        ageInput.value = ''

        Array.from(formHtml.elements).forEach(formElement => formElement.disabled = false );
    })
}

eventListeners()