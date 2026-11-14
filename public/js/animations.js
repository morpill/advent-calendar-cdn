export function createSnowflakes() {
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

export function getAnimationSettings() {
    const settings = {
        on: true,
        speed: 30
    }

    const saved = JSON.parse(localStorage.getItem('advent-calendar/animations')) || {};
    
    const final = structuredClone(settings);
    Object.assign(final, saved);
    return final;
}

export function updateAnimationSetting({ ...kwargs }) {
    const settings = getAnimationSettings();
    const final = structuredClone(settings)
    Object.assign(final, kwargs);
    localStorage.setItem('advent-calendar/animations', JSON.stringify(final));
    return final;
}

// setInterval(createSnowflakes, 30)