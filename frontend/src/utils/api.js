class Api {
    constructor({ address, token }) {
        this._address = address;
        this._token = token;
    }

    _apiAnswer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            method: 'GET',
            headers: {
                // authorization: this._token, 
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((res) => this._apiAnswer(res))
    }

    getUserData() {
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((res) => this._apiAnswer(res))
    }

    updateUserInfo(data) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then((res) => this._apiAnswer(res))
    }

    updateAvatar(data) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then((res) => this._apiAnswer(res))
    }

    postCard(data) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then((res) => this._apiAnswer(res))
    }

    deletetCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => this._apiAnswer(res))
    }

    putLike(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => this._apiAnswer(res))
    }

    deleteLike(id) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => this._apiAnswer(res))
    }

    changeLikeCardStatus(id, state) {
        return state ? this.putLike(id) : this.deleteLike(id)
    }

    logout = () => {
        return fetch(`${this._address}/logout`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.removeItem('jwt')}`,
            },
        })
    };
}

export const api = new Api({
    address: 'http://localhost:3000',
    token: `Bearer ${localStorage.getItem('jwt')}`,
})