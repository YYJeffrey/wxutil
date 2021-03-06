# wxutil

![build](https://img.shields.io/badge/build-passing-brightgreen) ![license](https://img.shields.io/badge/license-MIT-green)

wxutil 使用 promise 语法封装了微信小程序官方的高频API，以及常用的开发方法。  
[项目地址: https://github.com/YYJeffrey/wxutil/](https://github.com/YYJeffrey/wxutil/)

## 快速上手

方法一：在需要使用的位置引入 wxutil（以下两种方式均可引入）

```js
const wxutil = require('../../utils/wxutil.js')
```

方法二：通过导入自己所需模块来引入 wxutil

```js
import { request } from '../../utils/wxutil.js'
```

## 工具模块

- [网络请求](#网络请求)
- [文件请求](#文件请求)
- [socket](#socket)
- [图片操作](#图片操作)
- [交互](#交互)
  - [showToast](#showToast)
  - [showModal](#showModal)
  - [showLoading](#showLoading)
  - [showActionSheet](#showActionSheet)
- [缓存](#缓存)
  - [setStorage](#setStorage)
  - [getStorage](#getStorage)
- [授权](#授权)
  - [getLocation](#getLocation)
  - [getUserInfo](#getUserInfo)
  - [requestPayment](#requestPayment)
- [其他工具](#其他工具)

## 网络请求

封装微信小程序 wx.request() 实现http请求

### get

通过直接调用url获取请求

```js
wxutil.request.get(url).then(res => {
    console.log(res)
})
```

异步获取请求并捕获异常

```js
wxutil.request.get(url, (data = {}), (header = {})).then(res => {
    console.log(res)    // 业务处理
}).catch(error => {
    console.log(error)  // 异常处理
})
```

### post

```js
wxutil.request.post(url, (data = {}), (header = {})).then(res => {
    console.log(res)
})
```

### put

```js
wxutil.request.put(url, (data = {}), (header = {})).then(res => {
    console.log(res)
})
```

### delete

```js
wxutil.request.delete(url, (data = {}), (header = {})).then(res => {
    console.log(res)
})
```

### 全局 header

注：在app.js中写一个全局的 getHeader() 并返回 header 可以为全局所有请求带上该头部

```js
// app.js
getHeader() {
    const userDetail = wxutil.getStorage('userDetail')
    let header = {}
    if (userDetail) {
        header['Authorization'] = 'Token ' + userDetail.token
    }
    return header
}
```

## 文件请求

封装微信小程序 wx.downloadFile() 和 wx.uploadFile()

### download

```js
wxutil.file.download({ url }).then(res => {
    console.log(res)
})
```

### upload

```js
wxutil.file.upload({
    url: url,
    fileKey: fileKey,
    filePath: filePath,
    data: {},
    header: {},
}).then(res => {
    console.log(res)
})
```

## socket

封装微信小程序的 websocket 部分方法，实现 socket 流程如下

```js
// socket连接标识
let socketOpen = false
wxutil.socket.connect(url)

// 监听socket通信
wx.onSocketMessage(res => {
    console.log(res)
})

wx.onSocketOpen(() => {
    socketOpen = true
    if (socketOpen) {
    // 发送socket消息
    wxutil.socket.send('hello wxutil').then(res => {
      console.log(res)
    })
  }

    // 关闭socket连接
    wxutil.socket.close(url)
})
```

## 图片操作

封装微信小程序的 wx.saveImageToPhotosAlbum()、wx.previewImage()、wx.chooseImage()，用于保存图片到本机相册、预览图片以及从相机或相册选择图片

### save

```js
wxutil.image.save(path).then(res => {
    console.log(res)
})
```

### preview

```js
wxutil.image.preview(['imageUrl'])
```

### choose

参数：count, sourceType

```js
wxutil.image.choose(1).then(res => {
    console.log(res)
})
```

## 交互

封装微信小程序的 wx.showToast()、wx.showModal()、wx.showLoading() 和 wx.showActionSheet()

### showToast

```js
wxutil.showToast('hello')
```

### showModal

```js
wxutil.showModal('提示', '这是一个模态弹窗')
```

亦可传入参数并在回调函数中处理自己的业务

```js
wxutil.showModal(title: title, content: content, handler = {
    showCancel: showCancel,
    cancelText: cancelText,
    confirmText: confirmText,
    cancelColor: cancelColor,
    confirmColor: confirmColor
}).then(res => {
    console.log(res)
})
```

### showLoading

```js
wxutil.showLoading('加载中')
```

### showActionSheet

```js
wxutil.showActionSheet(['A', 'B', 'C']).then(res => {
    console.log(res)
})
```

## 缓存

封装微信小程序的 wx.setStorageSync() 和 wx.getStorageSync()，同步设置缓存和获取缓存内容，并允许为缓存设置过期时间

### setStorage

```js
wxutil.setStorage('userInfo', userInfo)
```

亦可为缓存设置过期时间，单位：秒

```js
wxutil.setStorage('userInfo', userInfo, 86400)
```

### getStorage

```js
wxutil.getStorage('userInfo')
```

## 授权

封装了需要用户授权微信小程序的方法

### getLocation

获取用户的地理位置

```js
wxutil.getLocation().then(res => {
    console.log(res)
})
```

亦可通过传入可选参数打开微信小程序的地图

```js
wxutil.getLocation('gcj02', true).then(res => {
    console.log(res)
})
```

### getUserInfo

获取用户信息，可传递两个参数：login 和 lang，login 为 true 可返回 wx.login 获取到的 code，lang 默认为中文，该方法需要使用 button 触发

```js
wxutil.getUserInfo().then(res => {
    console.log(res)
})
```

### requestPayment

封装了微信小程序的 requestPayment()，需要传递后端的 timeStamp、nonceStr、packageValue、paySign 这几个参数，加密方式默认为MD5

```js
wxutil.requestPayment({
    timeStamp: timeStamp,
    nonceStr: nonceStr,
    packageValue: packageValue,
    paySign: paySign,
}).then(res => {
    console.log(res)
})
```

## 其他工具

封装了常用的微信小程序方法，便于高效开发

### autoUpdate

在app.js中引用该方法，可在微信小程序发布新版本后自动更新

```js
wxutil.autoUpdate()
```

### isNotNull

判断字符串是否为空、空格回车等

```js
wxutil.isNotNull('text')
```

### getDateTime

获取当前日期时间，格式：yy-mm-dd hh:MM:ss

```js
const datetime = wxutil.getDateTime()
console.log(datetime)
```

### getTimestamp

获取当前时间戳

```js
const timestamp = wxutil.getTimestamp()
console.log(timestamp)
```

### calculate

精度计算

```js
wxutil.calculate.add(0.1, 0.2)
wxutil.calculate.sub(1, 0.8)
wxutil.calculate.mul(6, 0.7)
wxutil.calculate.div(1.2, 0.2)
```
