/**
 * Gets an element by its id.
 *
 * @param {string} id - The id of the element to find.
 * @returns {HTMLElement|null} The element with the given id, or null if not found.
 */
function getById(id) {
    return document.getElementById(id);
}

/**
 * Gets all elements with the given name attribute.
 *
 * @param {string} name - The name attribute of the elements to find.
 * @returns {NodeListOf<HTMLElement>} A NodeList of matching elements.
 */
function getByName(name) {
    return document.getElementsByName(name);
}

/**
 * Gets the first element matching a CSS selector.
 *
 * @param {string} selector - A valid CSS selector (e.g. "#id", ".class", "tag").
 * @returns {Element|null} The first matching element, or null if not found.
 */
function querySelector(selector) {
    return document.querySelector(selector);
}

document.addEventListener("DOMContentLoaded", () => {
    getById("btn-title").addEventListener("click", () => {
        getById("title").classList.toggle("highlight");
    });

    getById("btn-content").addEventListener("click", () => {
        Array.from(getByName("content")).forEach((el) => {
            el.classList.toggle("faded");
        });
    });

    getById("btn-image").addEventListener("click", () => {
        querySelector("img").classList.toggle("zoom");
    });
});
