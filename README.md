# React Hook - Use Cached Handlers
Simple React hook to cache event handlers.

### Description:
This is a hook that is useful for caching a list of actions / events especially for when the list of items should not change but may be subjected to unecessary re-renders because the list's parent is re-rendered.

In short, this hook can avoid redefining functions - which as a result, re-renders the list items
(even though they don't need to).

**NOTE: Do NOT use this hook if your list items SHOULD be re-rendered as a side-effect of updated parent state!**

Example usage:
```jsx
const [getHandlers] = useCachedHandlers((event) => {
  // handle click/hover/etc. event
}, [...hookDependencies]);

return (
  <ul>
    {list.map(item => (
      <ChildComponent onClick={getHandlers(item.key)}>{item.label}</ChildComponent>
    ))}
  </ul>
);
```