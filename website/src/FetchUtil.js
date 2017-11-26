/*
 * All functions to help with network calls
 */

/**
 * Utility method to manage responses.
 * Convert the response to JSON and manage errors
 * @param response the response for fetch()
 */
function processResponse(response) {
    if (!response.ok) {
        return response.json().then(err => {
            throw err;
        });
    }

    return response.json()
}

/**
 * Do an ajax GET to the <url> and return a promise with the response as JSON
 * @param url the url to get
 */
export function get(url) {
    return fetch(url).then(processResponse);
}

/**
 * Do an ajax POST to the <url> with <data> and return a promise with the response as JSON
 * @param url the url to post to
 * @param data the data to send as an object
 */
export function post(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(data),
    }).then(processResponse);
}

/**
 * Do an ajax DELETE to the <url> and return a promise with the response as JSON
 * @param url the url if the resource to delete
 */
export function callDelete(url) {
    return fetch(url, {
        method: 'DELETE',
    }).then(processResponse);
}