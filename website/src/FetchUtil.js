function processResponse(response) {
    if (!response.ok) {
        return response.json().then(err => {
            throw err;
        });
    }

    return response.json()
}

export function get(url) {
    return fetch(url).then(processResponse);
}

export function post(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(data),
    }).then(processResponse);
}

export function callDelete(url) {
    return fetch(url, {
        method: 'DELETE',
    }).then(processResponse);
}