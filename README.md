# ccnode-find

扩展Cocos Creator的cc.Node，增加node.find方法。

## Example

```javascript
// auto polyfill
require('ccnode-find');

cc.Class({
    extends: cc.Component,

    onLoad() {
        const btn = this.node.find('btn');
        // 也可以传完整路径，跟cc.find一样
        const btn2 = this.node.find('path/to/btn');

        console.assert(btn === btn2);
    }
});
```