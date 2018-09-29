// Symbol polyfill
// 只需要Symbol.iterator
(function SymbolAutoPolyfill() {
    if (typeof Symbol === 'function') return;

    function SymbolPolyfill() {
        // empty
    }
    // 尽量取特殊一点
    SymbolPolyfill.iterator = '__Symbol.iterator__';

    window.Symbol = SymbolPolyfill;
})();

cc.Node.prototype.iterator || (cc.Node.prototype.iterator = function() {
    // 子孙节点的广度优先迭代器
    let nodes = [];
    // children必定是个数组
    nodes = nodes.concat(this.children);

    return {
        [Symbol.iterator]() {
            return {
                next() {
                    if (!nodes.length) return {
                        value: null,
                        done: true
                    };

                    const node = nodes.shift();
                    // 数组会越来越大，可以想办法优化
                    nodes = nodes.concat(node.children);

                    return {
                        value: node,
                        done: false
                    };
                }
            };
        }
    };
});

cc.Node.prototype.find || (cc.Node.prototype.find = function(path) {
    // 在节点上部署find方法，方便使用
    const _path = path.split('/');
    const [firstNodeName] = _path;
    let _root = null;

    for (const node of this.iterator()) {
        if (node.name === firstNodeName) {
            _root = node;
            break;
        }
    }

    return _root ? (_path.length === 1 ? _root : cc.find(path, _root.parent)) : null;
});