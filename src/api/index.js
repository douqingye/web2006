import axios from '../utils/request'
import base from './base'
const api = {
    //  登录接口
    getLogin(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
    // 注册接口
    getRegister(params) {
        return axios.post(base.baseUrl + base.register, params)
    },
    //商品查询接口
    getSelectTbItemAllByPage(params) {
        return axios.get(base.baseUrl + base.selectTbItemAllByPage, {
            params
        })
    },
    //商品总条数
    getTotal(params) {
        return axios.get(base.baseUrl + base.total, {
            params
        })

    },
    // 搜索接口
    getSearch(params) {
        return axios.get(base.baseUrl + base.search, {
            params
        })
    },
    // 图片上传
    getUpload(params){
        return axios.get(base.baseUrl+base.upload,{
            params
        })

    },
    // 类目选择
    getCategory(params){
       return axios.get(base.baseUrl+base.Category,{
           params
       })
    },
    //添加商品
    getInsertTbItem(params){
        return axios.get(base.baseUrl+base.insertTbItem,{
            params
        })

    },
    // 商品删除
    getDeleteItemById(params){
        return axios.get(base.baseUrl+base.deleteItemById,{
            params
        })

    },
    // 预更新接口  编辑接口
    getPreUpdateItem(params){
        return axios.get(base.baseUrl+base.preUpdateItem,{
            params
        })
    },
    // 修改接口
    getUpdateTbItem(params){
        return axios.get(base.baseUrl+base.updateTbItem,{
            params
        })
    },
    // 单一类目数据获取
    getPreCategory(params){
        return axios.get(base.baseUrl+base.preCategory,{
            params
        })
    },
     /**
     * 规格参数读取数据
     */
    selectItemParamAll(params){
        return axios.get(base.baseUrl + base.selectItemParamAll,{
            params
        })
    },
    /**
     * 规格参数模糊查询
     */
    paramsSearch(params){
        return axios.get(base.baseUrl + base.paramsSearch,{
            params
        })
    },
    /**
     * 规格参数删除
     */
    paramsDelete(params){
        return axios.get(base.baseUrl + base.paramsDelete,{
            params
        })
    },
    /**
     * 规格参数总条数
     */
    paramsTotal(){
        return axios.get(base.baseUrl + base.paramsTotal)
    },
    /**
     * 规格参数添加
     */
    insertItemParam(params){
        return axios.get(base.baseUrl + base.insertItemParam,{
            params
        })
    },
    /**
     * 规格参数配和产品添加
     */
    paramsItem(params){
        return axios.get(base.baseUrl + base.paramsItem,{
            params
        })
    },
      /**
     * 内容分类管理 导航查询
     */
    selectContentCategoryByParentId(params){
        return axios.get(base.baseUrl + base.selectContentCategoryByParentId,{
            params
        })
    },
     /**
     * 内容分类管理 添加导航
     */
    insertContentCategory(params){
        return axios.get(base.baseUrl + base.insertContentCategory,{
            params
        })
    },
     /**
     * 内容分类管理 修改导航
     */
    updateContentCategory(params){
        return axios.get(base.baseUrl + base.updateContentCategory,{
            params
        })
    },
    /**
     * 内容分类管理 删除导航
     */
    deleteContentCategoryById(params){
        return axios.get(base.baseUrl + base.deleteContentCategoryById,{
            params
        })
    },
    /**
     * 内容分类管理 内容添加
     */
    insertTbContent(params){
        return axios.get(base.baseUrl + base.insertTbContent,{
            params
        })
    },
    /**
     * 内容分类管理 内容查询
     */
    selectTbContentAllByCategoryId(params){
        return axios.get(base.baseUrl + base.selectTbContentAllByCategoryId,{
            params
        })
    },
     /**
     * 内容分类管理 内容删除
     */
    deleteContentByIds(params){
        return axios.get(base.baseUrl + base.deleteContentByIds,{
            params
        })
    }
}
export default api