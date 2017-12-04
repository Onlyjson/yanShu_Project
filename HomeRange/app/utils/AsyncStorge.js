import React, {
     AsyncStorage
 }from 'react-native';

 class DeviceStorage {
     // 获取
     async get(key) {
         return AsyncStorage.getItem(key).then((value) => {
             const jsonValue = JSON.parse(value);
             console.log(jsonValue);
             return jsonValue;
         });
     }

     // 保存
     async save(key, value) {
         return AsyncStorage.setItem(key, JSON.stringify(value));
     }

     // 删除
     async delete(key) {
         return AsyncStorage.removeItem(key);
     }
     }

 export default DeviceStorage;