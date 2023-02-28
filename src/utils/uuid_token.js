import {v4 as uuid} from 'uuid';
export const getUUID = () =>{
    // uuid从本地存储中直接拿去
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 检查本地是否已经有了
    if(!uuid_token){
        //如果没有，就生成一个，并存到本地
        uuid_token = uuid()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }

    // 函数得有返回值，否则就为undefined
    return uuid_token
}