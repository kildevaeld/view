
function removeNode(node: Node) {
    var parentNode = node.parentNode;
    if (parentNode) parentNode.removeChild(node);
}

function removeChildren(node: Node) {
    node = node.lastChild!;
    while (node) {
        var next = node.previousSibling;
        recollectNodeTree(node, true);
        node = next!;
    }
}


function recollectNodeTree(node: any, unmountOnly: boolean) {
    var component = node._component;
    if (component) {
        unmountComponent(component);
    } else {
        if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

        if (unmountOnly === false || node['__preactattr_'] == null) {
            removeNode(node);
        }
        removeChildren(node);
    }
}

export function unmountComponent(component: any) {

    var base = component.base;

    component._disable = true;

    if (component.componentWillUnmount) component.componentWillUnmount();

    component.base = null;

    var inner = component._component;
    if (inner) {
        unmountComponent(inner);
    } else if (base) {
        if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

        component.nextBase = base;

        removeNode(base);
        removeChildren(base);
    }

    if (component.__ref) component.__ref(null);
}
