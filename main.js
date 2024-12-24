
document.querySelector(".control-buttons span").onclick = function () {
    
    let yourName = prompt("Whats your name?");
    
    if (yourName == null || yourName == "") {
        
        document.querySelector(".info .name span").innerHTML = "UnKnown";
        
    }else{
        
        document.querySelector(".info .name span").innerHTML = yourName;
        
    }
    
    document.querySelector(".control-buttons").remove();
    
}


let duration = 1000;

let blocksContainer = document.querySelector(".memory-blocks");

let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys

let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

// Add Order Css Property To Game Blocks

blocks.forEach((block, index) => {
    
    block.style.order = orderRange[index];
    
    block.addEventListener('click', function () {
        
        flipBlock(block);
        
    });
});


// flip block function 

function flipBlock(selectedBlock) {
    
    selectedBlock.classList.add('is-flipped');
    
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    
    
    if (allFlippedBlocks.length === 2) {
        
        stopClicking();
        
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }
}

function stopClicking() {
    
    blocksContainer.classList.add('no-clicking');
    
    setTimeout(() => {
        
        blocksContainer.classList.remove('no-clicking');
        
    }, duration);
    
}


function checkMatchedBlocks(firstBlock, secondBlock) {
    
    let wrongElement = document.querySelector('.wrong span');
    
    if (firstBlock.dataset.fruits == secondBlock.dataset.fruits) {
        
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        
        document.getElementById('success').play();
        
    } else {
        
        wrongElement.innerHTML = parseInt(wrongElement.innerHTML) + 1;
        
        setTimeout(() => {
            
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
            
        }, duration);
        
        document.getElementById('fail').play();
        
    }
    
}


// shuffle function 

function shuffle(array) {
    
    let current = array.length,
    temp, 
    random;
    
    while (current >  0) {
        random = Math.floor(Math.random() * current);
        
        current--;
        
        temp = array[current];
        
        array[current] = array[random];
        
        array[random] = temp; 
    }
        return array
}
