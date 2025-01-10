function draw() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const x = 50;
    const y = 50;
    const size = 100;

    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, size, size);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, size, size);
}

window.onload = function() {
    draw();
};
