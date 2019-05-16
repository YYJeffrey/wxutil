//index.js
const util = require("../../utils/wxutil.js")

Page({
  data: {

  },

  onLoad: function(options) {
    this.testRequest()
    this.testShowToast()
  },

  testRequest: function() {
    const url = ""
    util.request.get(url).then((data) => {
      console.log(data)
    })
  },

  testShowToast: function() {
    util.showToast("haha", {
      icon: "success"
    })
    util.setStorage("a", "aaa");
    util.setStorage("b", "bbb", 6);
    console.log(util.getStorage("c"))
  }
})