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

### 批量update components
```sh
git submodule foreach git pull
```
