document.addEventListener('click', function (event) {
    if (event.target.tagName.toLowerCase() === 'a') {
        console.log(event.target) //Console logging anchor element for Cards Block
    } else {
        imageModal(event); //Function call to show modal with clicked image
    }
});

function imageModal(event) {
    if (event.target.classList.contains('modal-trigger')) {
        /*Get image Dialog element and the img container*/
        const imageDialog = document.querySelector("dialog"); 
        const imageDialogImgTag = document.querySelector("dialog img"); 
        /*Set image target to dialog image container and show it*/
        imageDialogImgTag.src = event.target.src;
        imageDialogImgTag.alt = event.target.alt;
        imageDialog.showModal();

        document.body.classList.add('dialog-open'); //Prevent body from scrolling on modal show

        imageDialog.addEventListener('click', function (event) { //Close modal when clicked outside it
            var rect = imageDialog.getBoundingClientRect();
            var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                imageDialog.close();
                document.body.classList.remove('dialog-open');
            }
        });
    }
}