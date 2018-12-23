/** Record of actions history. */
export type Record = {
    /** What will be done. */
    Redo: ()=>void;
    /** What will be undone then. */
    Undo: ()=>void;
}

/** Class that implements all functionality of history. */
export default class Hist {
    private depth_:  number;
    private list_:   Record[];
    private offset_: number;

    constructor(depth: number) {
        this.depth_ = depth;
        this.list_ = [];
        this.offset_ = 0;    
    }

    get UndoLength() { return this.list_.length - this.offset_ }
    get RedoLength() { return this.offset_; }

    /** Add new record to a history, then `r.Redo()` will be called automatically. */
    add(r: Record) {
        let lst = this.list_.slice(0, this.list_.length-this.offset_);
        if (lst.length === this.depth_) {
            lst = lst.splice(0, 1);
        }
        if (lst.length === this.depth_) return;
        lst.push(r);
        this.offset_ = 0;
        this.list_ = lst;
        r.Redo();
    }

    /** Undo the last record in a history. */
    undo () {
        if (this.list_.length) {
            let maxOffset = this.list_.length-1;
            if (this.offset_ <= maxOffset) {
                this.list_[maxOffset-this.offset_].Undo();
                this.offset_++;
            }
        }
    }

    /** Redo last undone record and return it back to the history. */
    redo() {
        if (this.list_.length) {
            let maxOffset = this.list_.length-1;
            if (this.offset_ > 0) {
                this.offset_--;
                this.list_[maxOffset-this.offset_].Redo();
            }
        }
    }

    /** Clean the history. */
    clean() {
        this.list_ = [];
        this.offset_ = 0;
    }
}
