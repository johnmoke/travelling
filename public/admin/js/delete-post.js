let articlesBlock = document.querySelector('.articles');

// event delegation because wewill attach the elemt to the event that already exit

articlesBlock.addEventListener('click', function(e){
    // we need the remove button's class
    if(e.target.classList.contains('btn-remove')) {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/posts/' + id, {
            method: 'DELETE'
        }) .then((resp) => resp.text())
           .then(() => window.history.go());
    }
})