import { makeAutoObservable } from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    
    setUser(user) {
        this._user = user
    }

    get isAuth() { //computed function or variabvle
        return this._isAuth
    }

    get user() { //вызываются в случае если переменная внутри была изменена что?
        return this._user
    }
}