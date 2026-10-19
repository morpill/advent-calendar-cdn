function createSnowflakes() {
    const snowflake = document.createElement("div");
    const x = Math.floor(Math.random() * window.innerWidth);
    const duration = Math.floor(Math.random() * 5) + 2;
    const z = Math.floor(Math.random() * 3);
    snowflake.className = "snowflake";
    snowflake.style.left = `${x}px`;
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.zIndex = z;
    document.body.appendChild(snowflake);
    setTimeout(() => {
        snowflake.remove();
    }, 1000 * duration);
}

setInterval(createSnowflakes, 30)