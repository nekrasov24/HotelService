

const TokenKey = 'token';

export function GetToken() {
    return localStorage.getItem(TokenKey);
}

export function SetToken(token) {
    localStorage.setItem(TokenKey, token);
}

