const add = (key: string, values: string): void => {
  localStorage.setItem(key, values);
};
const get = (key: string) => {
  // JSON.parse(localStorage.getItem(key)as string);  ! : Non-null assertion operator
  return JSON.parse(localStorage.getItem(key)!);
};
const clear = () => {
  return localStorage.clear();
};
const remove = (key:string) => {
  return localStorage.removeItem(key); 
}
export default {
  add,
  get,
  clear,
  remove,
};
