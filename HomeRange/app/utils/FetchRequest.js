/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/27 下午9:56
 */

// 导出 异步 函数 网络请求
export async function netRequest(url, params, successCallBack, failCallBack,noNet) {
    console.log('post')
    if ( isNet ){
        console.log('isNet')
        try {
            let data = await fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(params)
                }
            );
            console.log(params);
            if (data.status === 200){
                let res =await data.json()
                if(1 == res.code){
                    console.log(res);
                    return successCallBack(res);
                }
                else {
                    console.log(res);
                    return failCallBack(res);
                }
            }else {
                console.log(data);
                return failCallBack(data.json());
            }
        } catch (error){
            console.log(error);
            failCallBack(error);
        }
    }else {
        noNet();
    }

}
