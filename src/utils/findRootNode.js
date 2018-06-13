export default function findRootNode (node) {
  while (node && !node.deferredMapKitPromise) {
    node = node.$parent
  }
  return node
}
