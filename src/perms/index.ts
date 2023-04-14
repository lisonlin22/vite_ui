/*
@File    :   index.ts
@Time    :   2022/04/03 22:44:09
@Author  :   Lison LIN
@Version :   1.0
@Contact :   lisonlin22@qq.com
@Desc    :   插件
*/

// 移除元素
const HasRemove = (Vue: any) => {
    /**自定义按钮权限指令 */
    Vue.directive('remove', {
        mounted(el: any, binding: any) {
            //获取按钮权限
            // console.log(Vue.config.globalProperties.$_has(binding.value))
            if (!Vue.config.globalProperties.$_has(binding.value)) {
                //移除不匹配的按钮
                el.parentNode.removeChild(el)

            }
        },
    })
    //检查权限方法
    Vue.config.globalProperties.$_has = function (value: any) {
        let isExist = false
        // var btnPermsArr = JSON.parse(JSON.stringify(window.sessionStorage.getItem("perms")))
        const btnPermsArr: Array<String> = ["aa", "cc"]
        value.forEach((p: any) => {
            if (btnPermsArr && btnPermsArr.includes(p)) {
                isExist = true
            }
        });
        return isExist
    }
}

// 元素可选
const HasDisable = (Vue: any) => {
    /**自定义按钮权限指令 */
    Vue.directive('disabled', {
        mounted(el: any, binding: any) {
            //获取按钮权限
            if (!Vue.config.globalProperties.$_has(binding.value)) {
                //关闭不匹配的按钮
                el.setAttribute('disabled', 'disabled')
                el.setAttribute('class', el.getAttribute('class').concat('is-disabled'))
            }
        },
    })
    //检查权限方法
    Vue.config.globalProperties.$_has = function (value: any) {
        let isExist = false
        // var btnPermsArr = JSON.parse(JSON.stringify(window.sessionStorage.getItem("perms")))
        const btnPermsArr: Array<String> = ["aa", "cc"]
        value.forEach((p: any) => {
            if (btnPermsArr && btnPermsArr.includes(p)) {
                isExist = true
            }
        });
        // return isExist
        return isExist
    }
}
export {
    HasRemove,
    HasDisable
}
