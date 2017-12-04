'use strict'


const config = {
    api: {
        base:'http://39.108.139.245:9999/borapi',
        // base:'http://120.77.180.2:9999/borapi',
        //注册 测试ok
        register:'/user/register.do',
        //验证码 测试ok
        验证码:'/user/registercode.do',
        //登陆 测试ok
        login:'/user/login.do',
        //首页信息 测试ok
        shouye:'/shop/gethome.do',
        wangjimima:'/user/forgetpwd.do',//忘记密码
        wangjimima_yanzhengma:'/user/forgetpwdcode.do',//忘记密码验证码
        youhuiquan:'/user/coupon.do',//优惠券
        //收藏
        collect:'/col/collect.do',
        //取消收藏
        collectcancel:'/col/collectcancel.do',
        //新增评价
        add:'/comment/add.do',
        //获取评价
        get:'/comment/get.do',
        //获取用户信息
        getuser:'/user/getuser.do',
        //我的会员
        mycard:'/user/mycard.do',
        //我的收藏
        myclo:'/user/myclo.do',
        //获取二级
        getshops:'/shop/getshops.do',
        //搜索商家
        searchshops:'/shop/searchshops.do',
        //商家详情
        shopinfo:'/shop/shopinfo.do',
        //商家详情2【包括评价】
        shopinfoassess:'/shop/shopinfoassess.do',
        //商家优惠卷
        shopcoupon:'/shop/shopcoupon.do',
        //获取折扣价
        getdiscountprice:'/pay/getdiscountprice.do',
        //商家付款
        pay:'/pay/pay.do',
        //获取会员开通费用
        getcardprice:'/pay/getcardprice.do',
        //会员开通付款
        payusercard:'/pay/payusercard.do',
        //获取订单
        getorder:'/order/getorder.do',
        update:'/user/update.do',
        upload:'/file/upload.do',
        //商家预付款
        prepay:'/pay/prepay.do',
        cardprepay:'/pay/cardprepay.do'


    },

    map: {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        follow: 20,
        timeout: 8000,
        size: 0,
    },
    formMap:{
        headers:{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d'
            }
        }
    }

}


module.exports = config