export const saveToken = (token) => {
    return localStorage.setItem('token',token)
}

export const getToken = () =>{
    return localStorage.getItem('token')
}

export const removeToken = () => {
    return localStorage.removeItem('token')
}

export const isAuthenticated = () => {
    return !!getToken()
}