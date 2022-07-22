/*******************************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 10:37:05
 * Description: 视图层: 视图的内核, 模型就是指视图的数据
*******************************************************************************/

class AjaxResult {
    constructor(data) {
        this.status = 200
        this.data = data
        this.msg = '请求成功'
    }

    setStatus(status) {
        this.status = status
        return this
    }

    setData(data) {
        this.data = data
        return this
    }

    setMsg(message) {
        this.msg = message
        return this
    }

    set401() {
        this.status = 401
        this.msg = '用户未登录'
        return this
    }

    set404() {
        this.status = 404
        this.msg = '无效请求'
        return this
    }

    set500(msg) {
        this.status = 500
        this.msg = msg
        return this
    }
}

AjaxResult.error = (msg) => {
    return new AjaxResult().setStatus(500).setMsg(msg)
}

AjaxResult.success = (data, msg = '请求成功') => {
    const result = new AjaxResult()
    data && result.setData(data)
    return result.setMsg(msg)
}

export default AjaxResult
