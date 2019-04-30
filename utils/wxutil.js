/**
 * @Author: Jeffrey
 * @Date: 2019-04
 */


/**
 * request用法：
 * 1.request.get(url).then((data) => {}).catch((error) => {})
 * 2.request.post({url: url, data: {}, header: {}}).then((data) => {}).catch((error) => {})
 * 3.request.put({url: url, data: {}, header: {}}).then((data) => {}).catch((error) => {})
 * 4.request.patch({url: url, data: {}, header: {}}).then((data) => {}).catch((error) => {})
 * 5.request.delete({url: url, data: {}, header: {}}).then((data) => {}).catch((error) => {})
 * @param {JSON Object} handler 
 */
const request = {
  get: function(handler) {
    if (typeof handler === "string") {
      handler = {
        url: String(handler),
        data: {}
      }
    }
    return this.Request("GET", handler)
  },

  post: function(handler) {
    return this.Request("POST", handler)
  },

  put: function(handler) {
    return this.Request("PUT", handler)
  },

  patch: function(handler) {
    return this.Request("PATCH", handler)
  },

  delete: function(handler) {
    return this.Request("DELETE", handler)
  },

  // RequestHandler
  Request: function(method, handler) {
    const {
      url,
      data,
      header
    } = handler;
    const head = {
      'content-type': 'application/json'
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: Object.assign(head, header),
        method: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].indexOf(method) > -1 ? method : 'GET',
        success: function(res) {
          resolve(res)
        },
        fail: function() {
          reject('request failed')
        }
      })
    })
  }
}


/**
 * file用法：
 * 1.file.download(url).then((data) => {}).catch((error) => {})
 * 2.file.upload({url: url, fileName: fileName, filePath: filePath, data: {}, header: {}}).then((data) => {}).catch((error) => {})
 * @param {JSON Object} handler 
 */
const file = {
  download: function(handler) {
    if (typeof handler === "string") {
      handler = {
        url: String(handler)
      }
    }
    const {
      url,
      filePath,
      header
    } = handler
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: url,
        filePath: filePath,
        header: header,
        success: function(res) {
          resolve(res)
        },
        fail: function() {
          reject('downloadFile failed')
        }
      })
    })
  },

  upload: function(handler) {
    const {
      url,
      fileName,
      filePath,
      data,
      header
    } = handler
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: url,
        name: fileName,
        filePath: filePath,
        formData: data,
        header: header,
        success: function(res) {
          resolve(res)
        },
        fail: function() {
          reject('uploadFile failed')
        }
      })
    })
  },
}


/**
 * showToast用法：
 * 1.showToast("成功")
 * @param {String} title 
 * @param {JSON Object} handler 
 */
function showToast(title, handler = {}) {
  const {
    icon,
    image,
    duration,
    mask,
  } = handler
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      image: image,
      icon: typeof icon === "undefined" ? "none" : icon,
      duration: typeof duration === "undefined" ? 1000 : duration,
      mask: typeof mask === "undefined" ? true : mask,
      success: function(res) {
        resolve(res)
      },
      fail: function() {
        reject('showToast failed')
      }
    })
  })
}


/**
 * showModal用法：
 * 1.showModal("提示", "这是一个模态弹窗")
 * @param {String} title 
 * @param {String} content 
 * @param {JSON Object} handler 
 */
function showModal(title, content, handler = {}) {
  const {
    showCancel,
    cancelText,
    confirmText,
    cancelColor,
    confirmColor,
  } = handler
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      content: content,
      showCancel: showCancel,
      cancelText: cancelText,
      confirmText: confirmText,
      cancelColor: cancelColor,
      confirmColor: confirmColor,
      success: function(res) {
        resolve(res)
      },
      fail: function() {
        reject('showModal failed')
      }
    })
  })
}


/**
 * showLoading用法：
 * 1.util.showLoading("加载中")
 * @param {String} title 
 * @param {Boolean} mask 
 */
function showLoading(title, mask = false) {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      mask: mask,
      success: function(res) {
        resolve(res)
      },
      fail: function() {
        reject('showLoading failed')
      }
    })
  })
}


/**
 * setStorage用法：
 * 1.setStorage("userInfo", userInfo)
 * 2.setStorage("userInfo", userInfo, 86400)
 * @param {String} key 
 * @param {Object} value 
 * @param {Int} time 过期时间，可选参数
 */
function setStorage(key, value, time) {
  const dtime = "_deadtime"
  wx.setStorageSync(key, value)
  const seconds = parseInt(time)
  if (seconds > 0) {
    let timestamp = Date.parse(new Date()) / 1000 + seconds
    wx.setStorageSync(key + dtime, timestamp + "")
  } else {
    wx.removeStorageSync(key + dtime);
  }
}


/**
 * getStorage用法：
 * 1.getStorage("userInfo")
 * @param {String} key 
 */
function getStorage(key) {
  const dtime = "_deadtime"
  const deadtime = parseInt(wx.getStorageSync(key + dtime))
  if (deadtime && Date.parse(new Date()) / 1000 > parseInt(deadtime)) {
    return null
  }
  const res = wx.getStorageSync(key)
  return res ? res : null
}


/**
 * 字符串判空 - regNull用法：
 * 1.regNull("text")
 * @param {String} text 字符串
 * @return {Boolean} 字符串合法返回真否则假
 */
function regNull(text) {
  if (text == null) {
    return false;
  }
  if (text.match(/^\s+$/)) {
    return false;
  }
  if (text.match(/^[ ]+$/)) {
    return false;
  }
  if (text.match(/^[ ]*$/)) {
    return false;
  }
  if (text.match(/^\s*$/)) {
    return false;
  }
  return true;
}


/**
 * 获取日期时间 - getDateTime用法：
 * 1.getDateTime()
 * @param {Date} date 
 */
function getDateTime(date = new Date()) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  }
}


/**
 * 获取时间戳 - getTimestamp用法：
 * 1.getTimestamp()
 * @param {Date} date 
 */
function getTimestamp(date = new Date()) {
  return date.getTime()
}


module.exports = {
  request: request,
  file: file,
  showToast: showToast,
  showModal: showModal,
  showLoading: showLoading,
  setStorage: setStorage,
  getStorage: getStorage,
  regNull: regNull,
  getDateTime: getDateTime,
  getTimestamp: getTimestamp
}