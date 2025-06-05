const modal = document.getElementById('modal');
const content = document.getElementById('modal-cont')

function showModal() {
    modal.classList.add('show-overlay')
    content.classList.remove('hide-content')
}

function hideModal() {
    modal.classList.remove('show-overlay')
    content.classList.add('hide-content')
}

let cards = document.getElementsByClassName('card');

for (let item of cards) {
    console.log(item)
    item.addEventListener('click', showModal)
}

modal.addEventListener('click', hideModal)
document.getElementById('modal-cont').addEventListener('click', function(event) {event.stopPropagation()})