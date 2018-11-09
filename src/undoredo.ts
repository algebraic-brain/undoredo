export type Record = {
    Redo: ()=>void;
    Undo: ()=>void;
}

export default function Hist(depth: number) {
    let depth_ = depth;
    let list_ = [];
    let offset_ = 0;

    Object.defineProperties(this, {
        UndoLength: { get: () => list_.length - offset_ },
        RedoLength: { get: () => offset_ }
    });

    this.add = (r: Record) => {
        let lst = list_.slice(0, list_.length-offset_);
        if (lst.length === depth_) {
            lst = lst.splice(0, 1);
        }
        if (lst.length === depth_) return;
        lst.push(r);
        offset_ = 0;
        list_ = lst;
        r.Redo();
    }

    this.undo = () => {
        if (list_.length) {
            let maxOffset = list_.length-1;
            if (offset_ <= maxOffset) {
                list_[maxOffset-offset_].Undo();
                offset_++;
            }
        }
    }

    this.redo = () => {
        if (list_.length) {
            let maxOffset = list_.length-1;
            if (offset_ > 0) {
                offset_--;
                list_[maxOffset-offset_].Redo();
            }
        }
    }

    this.clean = () => {
        list_ = [];
        offset_ = 0;
    }
}
