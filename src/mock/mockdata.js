// 使用 Mock
import Mock from 'mockjs';
// 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
Mock.setup({
    timeout: '200 - 400'
})
// Mock响应模板
Mock.mock('/menuData',{
    'list|1-10':[{
                'id|+1':1,// 序号 属性值自动加 1，初始值为 1
                'businesscode':/\d{1,10}/,// 商户ID
                'proversion|1':['标准版','企业版','试用版'],// 产品版本 随机选取 1 个元素
                'storecode':/\d{1,10}/,// 门店编码
                'storename':'@cname',// 门店名称
                'status|1':['试用','使用','续用'],//状态 随机选取 1 个元素
                'effectdate':'@date("yyyy-MM-dd")',// 有效日期
    }]
});
