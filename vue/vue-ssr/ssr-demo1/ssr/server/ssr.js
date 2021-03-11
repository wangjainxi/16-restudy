const express = require('express')
const app = express()
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir);
// 1.静态文件服务
app.use(express.static(resolve('./../dist/client/'),{
  index: false // 默认会返回index.html
}))

// 渲染器 bundleRenderer,它可以获取签名生成的两个json文件
// 得到一个渲染器，可以直接渲染vue实例
const {createBundleRenderer} = require('vue-server-renderer')
const bundle = resolve('../dist/client/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  template: require('fs').readFileSync(resolve("../public/index.html"), "utf-8"), // 宿主⽂件
  clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")) // 客户端清单
  });


// 路由
app.get('*',async (req, res) =>{
  const context = {
    url: req.url
  }
  try{
    // 渲染获取html字符串
    // renderer 会调用，创建vue实例，跳转至首屏，把它渲染出来，类似快照
    const html = await renderer.renderToString(context)
    res.send(html)
  }catch(error){
    // 500
    res.status(500).send('Internal Server Error')
  }

})

// 端口
app.listen(9000, () =>{
  console.log('server listen on 9000')
})
