## 开发须知

### clone
```sh
// need test
git clone --recursive git@github.com:uxcore/kuma.git
```

### 添加component
```sh
git submodule add -b master git@github.com:uxcore/uxcore-xxx.git src/components/uxcore-xxx
```

# kuma4.0

Kuma4.0 开始，为uxcore 服务,完全适应border-box模型

# kuma3.0

从Kuma3.0 开始，使用less，grunt，构建类bootstrap的kuma css 套件，
里面会包括 fix 布局及 全屏布局，同时后续会支持skin主题


# how to build
---

* tnpm install
* grunt

# IE8和box-sizing
IE8对box-sizing的支持不是很好，所以我们需要增加width属性，对应fix issue [here](https://github.com/twbs/bootstrap/pull/10410) , 对IE8, 我们需要使用[Respond](https://github.com/scottjehl/Respond) 来处理matchMedia


# how to use
---
和设计师沟通后，我们web页面，目前支持1000px和1180px两种, 请看example里面的layout.html demo。

kuma.less

---

全站通用组件css集合。<br/>
包含如下样式：<br/>
- kuma-base<br/>
- kuma-iconfont<br/>
- kuma-select<br/>
- kuma-checkbox<br/>
- kuma-table<br/>
- kuma-button<br/>
- kuma-form<br/>
- kuma-filter<br/>
- kuma-tiptext<br/>
- kuma-crumbs<br/>
- kuma-layout<br/>
- kuma-steps<br/>
- kuma-layout<br/>
