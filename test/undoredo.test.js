let { default: Hist } = require('./dist/undoredo');

test("`hist.UndoLength` should be 0 after `add` to zero-size history", ()=>{
    let hist = new Hist(0);
    hist.add({Redo: ()=>{}, Undo: ()=>{}})
    expect(hist.UndoLength).toBe(0);
})

test("`hist.UndoLength` should be 1 after `add` to 1-sized history", ()=>{
    let hist = new Hist(1);
    hist.add({Redo: ()=>{}, Undo: ()=>{}})
    expect(hist.UndoLength).toBe(1);
})

test("`hist.RedoLength` should be 1 after `add`-`undo` for 1-sized history", ()=>{
    let hist = new Hist(1);
    hist.add({Redo: ()=>{}, Undo: ()=>{}})
    hist.undo();
    expect(hist.RedoLength).toBe(1);
})

test("`hist.RedoLength` should be 0 after `add`-`undo`-`add` for 1-sized history", ()=>{
    let hist = new Hist(1);
    hist.add({Redo: ()=>{}, Undo: ()=>{}})
    hist.undo();
    hist.add({Redo: ()=>{}, Undo: ()=>{}})
    expect(hist.RedoLength).toBe(0);
})

test("`count` should be 1 after adding `()=>{count++} and again 0 after undo`", ()=>{
    let hist = new Hist(1);
    let count = 0;
    hist.add({Redo: ()=>{count++}, Undo: ()=>{count--}})
    expect(count).toBe(1);
    hist.undo();
    expect(count).toBe(0);
    hist.redo();
    expect(count).toBe(1);
})