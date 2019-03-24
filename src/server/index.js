const Koa = require('koa')
const Cors = require('koa-cors')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

let content = [
  {
    id: '31e0621cca4742a8a01f5abb660be103',
    createdAt: 1532424502000,
    updatedAt: 1532424547000,
    tenantCode: '61fb5ab198064d66ad417d387fcb7fe9',
    name: '小米',
    code: '730a033904ea45b2a09e8f0e332fb5b2',
    logoUrl: 'http://pb8iavw7g.bkt.clouddn.com/28-1532424636376.jpg',
    homePageUrl: 'http://mall.deepexi.com/platform-dashboard/product/brand',
    status: 'forbidden',
    sort: null,
    alias: '小米',
    description: '蜜柚'
  },
  {
    id: 'eb55d9f3b7a344378efdc92d3ab4d46a',
    createdAt: 1532404255000,
    updatedAt: 1532413515000,
    tenantCode: '61fb5ab198064d66ad417d387fcb7fe9',
    name: '托尔斯泰',
    code: 'b38c0c7c607e44dfa985cbd7ac91d6c9',
    logoUrl: 'http://pb8iavw7g.bkt.clouddn.com/15040Q30T2-1-1532404428461.jpg',
    homePageUrl: 'http://mall.deepexi.com/platform-dashboard/product/brand',
    status: 'normal',
    sort: null,
    alias: 'test',
    description: '这是品牌介绍\n测试数据\n品牌效应'
  },
  {
    id: 'a065802ea6164bda8772e8d681cad476',
    createdAt: 1532080410000,
    updatedAt: 1532080482000,
    tenantCode: '61fb5ab198064d66ad417d387fcb7fe9',
    name: '滴普',
    code: '201a16d147e4488391ad5dfc5b4b9445',
    logoUrl: 'http://pb8iavw7g.bkt.clouddn.com/deep-logo-1532080407626.png',
    homePageUrl: 'http://a',
    status: 'normal',
    sort: null,
    alias: 'deep',
    description: 'aaa'
  }
]
let list = {
  payload: {
    content,
    totalElements: content.length,
    totalPages: Math.ceil(content.length / 10),
    last: true,
    numberOfElements: 3,
    sort: [
      {
        direction: 'DESC',
        property: 'createdAt',
        ignoreCase: false,
        nullHandling: 'NATIVE',
        ascending: false
      }
    ],
    first: true,
    size: 10,
    number: 0
  },
  request_id: 'b5fa3dd8-f300-4894-bec6-59e2b12e16f6'
}
const methods = {
  delete(index) {
    content.splice(index, 1)
  },
  put(index, target) {
    for (let key in target) {
      content[index][key] && (content[index][key] = target[key])
    }
  }
}
/*从content查找匹配项并执行相应的method */
function search(target, type, method) {
  let result
  for (let i = 0; i < content.length; i++) {
    if (content[i][type] === target[type]) {
      return methods[method](i, target)
    }
  }
}
const app = new Koa()
const router = new Router()
app.use(Cors())
app.use(bodyParser())
app.use(router.routes())

router.get('/', async ctx => {
  let {name} = ctx.request.query
  /* 判断是否有查询条件 */
  if (name) {
    list.payload.content = content.filter(item => {
      return item.name === name
    })
    ctx.body = list
  } else {
    list.payload.content = content
    ctx.body = list
  }
})
router.delete('*', async ctx => {
  let target = ctx.request.body
  target.forEach(item => {
    search({id: item}, 'id', 'delete')
  })
  ctx.body = {
    code: 0,
    data: {
      msg: 'deleted'
    }
  }
})
router.put('*', async ctx => {
  let target = ctx.request.body
  search(target, 'id', 'put')
  ctx.body = {
    code: 0,
    data: {
      msg: 'put'
    }
  }
})
router.post('*', async ctx => {
  let target = ctx.request.body
  content.push(target)
  ctx.body = {
    code: 0,
    data: {
      msg: 'posted'
    }
  }
})
app.listen(8080)
