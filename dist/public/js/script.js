import * as elements from "./elements.js";
import * as animations from "./animations.js";
import states from "./states.js";

const doors = elements.getAllDoors();
const APIBase = '/';

function addDoorEventListeners(doors, func) {
    for (let door of doors) {
        door.addEventListener('click', () => func(door.getAttribute('day'), door));
    }
}

async function openDoor(day, doorElem) {
    await playAudio(day, doorElem);
}

function openDoorElement(doorElem) {
    doorElem.querySelector('.door').classList.add('open');
    doorElem.querySelector('.inner').innerHTML = /* html */ `<ion-icon name="musical-note" class="note"></ion-icon>`;
}

async function getAccessKey(day) {
    const resp = await fetch(`/get_access/${day}`);
    if (!resp.ok) {
        return false;
    }
    const data = await resp.json();
    return data.access_key;
}

async function loadAudioBlob(day) {
    const accessKey = await getAccessKey(day);
    if (!accessKey) return null;

    try {
        const resp = await fetch(`/audio/${day}?access_key=${encodeURIComponent(accessKey)}`);

        if (!resp.ok) return null;

        return await resp.blob();
    } catch (e) {
        return null;
    }
}

async function playAudio(day, doorElem) {
    const blob = await loadAudioBlob(day);
    const blobURL = URL.createObjectURL(blob);

    if (states.audioPlaying) return false;

    if (!blob) return false;

    states.audioPlaying = true;

    openDoorElement(doorElem);

    const audio = new Audio(blobURL);

    return new Promise((resolve) => {
        audio.addEventListener('ended', () => {
            states.audioPlaying = false;
            resolve(true);
        });

        audio.addEventListener('error', () => {
            states.audioPlaying = false;
            resolve(false);
        });

        audio.play().catch((e) => {
            states.audioPlaying = false;
            resolve(false);
        });
    });
}


function main() {
    addDoorEventListeners(doors, openDoor);
}

main();