let k = document.querySelectorAll('.next')
Array.from(k)

let k1 = document.querySelectorAll('.previous')
Array.from(k1)

for (let o of k) {
    o.addEventListener('click',function (e) {
        e.preventDefault();
        if(!(e.target.parentElement.parentElement.parentElement.nextElementSibling == null)){
            e.target.parentElement.parentElement.style.display = "none";
            e.target.parentElement.parentElement.parentElement.nextElementSibling.children[0].style.display = "block"
        }
    })
}

for (let o of k1) {
    o.addEventListener('click',function (e) {
        e.preventDefault();
        if(!(e.target.parentElement.parentElement.parentElement.previousElementSibling == null)){
            e.target.parentElement.parentElement.style.display = "none";
            e.target.parentElement.parentElement.parentElement.previousElementSibling.children[0].style.display = "block"
        }
})
}

let k2 = document.querySelectorAll('.next1')
Array.from(k)

let k3 = document.querySelectorAll('.previous1')
Array.from(k1)

for (let o of k2) {
    o.addEventListener('click',function (e) {
        e.preventDefault();
        if(!(e.target.parentElement.parentElement.nextElementSibling == null)){
            e.target.parentElement.parentElement.style.display = "none";
            e.target.parentElement.parentElement.nextElementSibling.children[0].style.display = "block"
        }
    })
}

for (let o of k3) {
    o.addEventListener('click',function (e) {
        e.preventDefault();
        if(!(e.target.parentElement.parentElement.previousElementSibling == null)){
            e.target.parentElement.parentElement.style.display = "none";
            e.target.parentElement.parentElement.previousElementSibling.children[0].style.display = "block"
        }
})
}