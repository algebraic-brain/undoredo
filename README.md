# undoredo

Simple undo/redo functionality for Java(Type)Script

[See online demo](https://codepen.io/algebrain/pen/yQvwEq)

# `jest` example

```typescript
    let hist = new Hist(1);
    let count = 0;
    hist.add({Redo: ()=>{count++}, Undo: ()=>{count--}})
    expect(count).toBe(1);
    expect(hist.UndoLength).toBe(1);
    hist.undo();
    expect(count).toBe(0);
    expect(hist.RedoLength).toBe(1);
    hist.redo();
    expect(count).toBe(1);
```