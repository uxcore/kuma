#KUMA

kuma for uxcore

## 现在组件的style采用submodule方式引入

当前引用组件列表
- components/uxcore-calendar/src/Calendar.less
- components/uxcore-dialog/src/Dialog.less
- components/uxcore-tooltip/src/Tooltip.less
- components/uxcore-pagination/src/Pagination.less
- components/uxcore-select2/src/Select2.less
- components/uxcore-tabs/src/Tabs.less
- components/uxcore-table/src/Table.less
- components/uxcore-dropdown/src/Dropdown.less
- components/uxcore-tree/src/Tree.less
- components/uxcore-mention/src/Mention.less
- components/uxcore-popover/src/Popover.less
- components/uxcore-uploader/src/index.less
- components/hovercard.less
- components/uxcore-transfer/src/Transfer.less
- components/uxcore-collapse/src/Collapse.less
- components/uxcore-form/src/Form.less
- components/uxcore-progress/src/Progress.less
- components/uxcore-steps/src/Steps.less
- components/uxcore-menu/src/Menu.less
- components/uxcore-checkbox-group/src/Checkboxgroup.less
- components/uxcore-radiogroup/src/Radiogroup.less
- components/uxcore-layout/src/Layout.less
- components/uxcore-multi-select/src/MultiSelect.less
- components/uxcore-crumb/src/Crumb.less
- components/uxcore-grid/src/Grid.less
- components/uxcore-totop/src/Totop.less
- components/uxcore-alert/src/Alert.less
- hovercard.less
- employee.less


## 开发须知

### clone
```sh
// need test
git clone --recursive git@github.com:uxcore/kuma.git
// 把所有submodule切到master分支
git submodule foreach git checkout master
```

### 添加component
```sh
git submodule add -b master git@github.com:uxcore/uxcore-xxx.git src/components/uxcore-xxx
```

### 批量update components
```sh
git submodule foreach "(git checkout master; git pull)&"
```

[why](http://stackoverflow.com/questions/1030169/easy-way-pull-latest-of-all-submodules)
