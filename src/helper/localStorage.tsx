const add = (key:string,values:string):void => {
    localStorage.setItem(key,values);
}
const get = (key:string) => {
    // JSON.parse(localStorage.getItem(key)as string);  ! : Non-null assertion operator
    return JSON.parse(localStorage.getItem(key)!);
}
const clear = () => {
    return localStorage.clear()
}
export default {
    add,
    get,
    clear
}