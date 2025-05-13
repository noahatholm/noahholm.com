
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let array;

const size = 20;
const width = 80;
const height = 50;
let gen = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function createArray() {
    let neighbours = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => 0)
    );
    array = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => 0)
    );



    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array[y].length; x++) {

            if (getRandomInt(3) === 1) { array[y][x] = 1; }
            else { array[y][x] = 0; }
        }
    }
    console.log(array);
    return neighbours;


}



function createArrayZero() {
    let neighbours = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => 0)
    );
    array = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => 0)
    );
}




function customArray1() {
    createArrayZero();
    const middleX = Math.floor(width / 2);
    const middleY = Math.floor(height / 2);

    array[middleY][middleX] = 1;
    array[middleY + 1][middleX] = 1;
    array[middleY + 2][middleX] = 1;
    array[middleY + 1][middleX - 1] = 1;
    array[middleY + 2][middleX + 1] = 1;
}

function customArray2() {
    createArrayZero();
    const middleX = Math.floor(width / 2);
    const middleY = Math.floor(height / 2);

    array[middleY][middleX] = 1;
    array[middleY + 2][middleX -1 ] = 1;
    array[middleY + 2][middleX] = 1;
    array[middleY + 1][middleX + 2] = 1;
    array[middleY + 2][middleX + 3] = 1;
    array[middleY + 2][middleX + 4] = 1;
    array[middleY + 2][middleX + 5] = 1;
}

function draw() {
    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array[y].length; x++) {
            ctx.fillStyle = array[y][x] === 1 ? "white" : "black";
            ctx.strokeStyle = "grey";
            ctx.fillRect(x * size, y * size, size, size);
            ctx.strokeRect(x * size, y * size, size, size);
        }
    }
}

function update(neighbours) {
    populateNeighbours(neighbours);
    let alive = 0;
    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array[y].length; x++) {
            array[y][x] = updateCell(array[y][x], neighbours[y][x])
            alive += array[y][x];
        }
    }
    return alive;
}

function updateCell(status, neighbours) {
    if (status) {
        if (neighbours < 2) { return 0; }
        else if (neighbours > 3) { return 0; }
        else { return 1; }
    }
    if (neighbours === 3) { return 1; }
    return 0;
}

function populateNeighbours(neighbours) {
    for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array[y].length; x++) {
            neighbours[y][x] = getNeighbours(y, x);
        }
    }
}

function getNeighbours(y, x) {
    let neighbours = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let row = (x + i + width) % width;
            let col = (y + j + height) % height;
            neighbours += array[col][row];
        }
    }

    neighbours -= array[y][x];
    return neighbours;
}

function setGen(gen) {
    const counter = document.getElementById("iterations");
    counter.innerHTML = `Generation: ${gen}`;
}

function setPop(pop) {
    const counter = document.getElementById("population");
    counter.innerHTML = `Population: ${pop}`;
}



async function main() {
    
    //Event listener to click
    canvas.addEventListener("click", function () {
        console.log("clickity");
        createArray();
        gen = 0;
    });

    const slider = document.getElementById("slidy");
    const output = document.getElementById("speedo");
    console.log(slider);
    output.innerHTML = slider.value; // Display the default slider value
    let delay = (101 - slider.value) * 10;

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        output.innerHTML = `Speed: ${this.value}`;
        delay = (101 - this.value) * 10;
        console.log(delay);
    }

    let neighbours = await createArray();
    console.log(array);
    await sleep(delay);
    
    while (1) {
        await sleep(delay);
        await setPop(update(neighbours));
        await gen++;
        await draw();
        await setGen(gen);
    }



}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});
