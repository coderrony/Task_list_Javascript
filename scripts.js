let newTask = document.querySelector(".new_task")
let addTask = document.querySelector(".form")
let ul = document.querySelector("ul")
let clear_task = document.querySelector(".clear_task")
let filter = document.querySelector(".filter")

addTask.addEventListener("submit", addTaskSubmit)
document.addEventListener("DOMContentLoaded", getItemFromDom)
ul.addEventListener("click", removeEle)
clear_task.addEventListener("click", clearTask)
filter.addEventListener("keyup", filterFun)

function addTaskSubmit(e) {
    if (newTask.value === "") {
        alert("add a task")
    } else {
        let li = document.createElement("li")
        li.appendChild(document.createTextNode(newTask.value + " "))

        let link = document.createElement("a")
        link.setAttribute("href", "#")
        link.appendChild(document.createTextNode("x"))
        link.style.color = "red"

        li.appendChild(link)
        ul.appendChild(li)
        storeLocal(newTask.value)
        newTask.value = ""
    }

}

function removeEle(e) {
    let ele = e.target.parentElement
    ele.remove()

    removeFromLocal(ele)

}

function storeLocal(value) {
    let tasks = []
    if (localStorage.getItem("tasks") === null) {
        tasks.push(value)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    } else {
        let arr = JSON.parse(localStorage.getItem('tasks'))
        arr.push(value)
        localStorage.setItem("tasks", JSON.stringify(arr))
    }
}

function getItemFromDom() {
    if (localStorage.getItem("tasks") != null) {

        let allTask = JSON.parse(localStorage.getItem("tasks"))


        allTask.forEach((item => {
            let li = document.createElement("li")
            li.appendChild(document.createTextNode(item + " "))

            let link = document.createElement("a")
            link.setAttribute("href", "#")
            link.appendChild(document.createTextNode("x"))
            link.style.color = "red"

            li.appendChild(link)
            ul.appendChild(li)


        }))

    }
}

function removeFromLocal(ele) {
    let singleEle = ele.firstChild.textContent
    let allTask = JSON.parse(localStorage.getItem("tasks"))


    allTask.forEach(((item, index) => {

        if (item === singleEle.trim()) {
            allTask.splice(index, 1)
            return
        }
    }))
    localStorage.setItem("tasks", JSON.stringify(allTask))

}

function clearTask(e) {
    if (ul.children.length != 0) {
        while (ul.children.length != 0) {

            ul.firstChild.remove()
        }

        localStorage.clear()
    }
}

function filterFun(e) {
    let nodes = Array.from(ul.children)
    let text = e.target.value.toLowerCase()
    console.log(Array.from(nodes))
    nodes.forEach(item => {
        let singleItem = (item.firstChild.textContent.toLowerCase()).trim()

        if (singleItem.includes(text)) {
            item.style.display = "block"
        } else {
            item.style.display = "none"
        }
    })
}