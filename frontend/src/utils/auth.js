export const BASE_URL = 'http://localhost:3000';

const responseCheck = (response) => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);


export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        'credentials': 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(responseCheck)
};

export const login = (email, password, token) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        'credentials': 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password })
    })
        .then(responseCheck)
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        'credentials': 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(responseCheck)
}