// Custom HTML tags

class CalendarTag extends HTMLElement {
    constructor() {
        super();
    }
}

customElements.define('advent-calendar', CalendarTag);

class DayTag extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const day = this.getAttribute('day');
        this.id = `day-${day}`;
        this.innerHTML = /* html */ `
            <div id="door-${day}" class="door closed">${day}</div>
            <div class="inner" id="inner-${day}">${day.toUpperCase()}</div>
        `;
    }
}

const DAY_AG_NAME = 'cal-door';

customElements.define(DAY_AG_NAME, DayTag);

// ====================================================

// Methods

export function getAllDoors() {
    return document.querySelectorAll(DAY_AG_NAME);
}