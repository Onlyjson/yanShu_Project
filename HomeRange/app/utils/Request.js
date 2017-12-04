/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/11 下午8:22
 */
'use strict'

import config from './Config';
import queryString from 'query-string';
import _ from 'lodash';

let request={}
//设定params json对象 {}

request.get = (url,params) =>{
    //query-string
    if(params){
        url += '?' + queryString.stringify(params)
    }

    return fetch(url).
    then((response)=> response.json())


}

request.postfrom = (url,body) =>{
    //json对象的合并   工具：lodash

    // config.map  body 合并
    let map= _.extend(config.formMap,{
        body: JSON.stringify(body)
    })


    console.log(url)
    console.log(map)

    return fetch(url,map).
    then((response)=> response.json())

}

request.post = (url,body) =>{
    //json对象的合并   工具：lodash

    // config.map  body 合并
    let map= _.extend(config.map,{
        body: JSON.stringify(body)
    })


    console.log(url)
    console.log(map)

    return fetch(url,map).
    then((response)=> response.json())

}


// String 类型 参数
request.postString = (url,body) =>{
    //json对象的合并   工具：lodash

    // config.map  body 合并
    let map= _.extend(config.map,{
        body: body
    })

    return fetch(url,map).
    then((response)=> response.json())


}




module.exports = request
