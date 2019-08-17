class CircularBuffer {
    constructor(size) {
      this.buffer = new Array(size);
      this.id = 0;
    }
  
    read() {
        let isEmpty = true;
        let value;
        console.log(this.buffer);
        let min = 100000; let index;
        for (let i = 0; i < this.buffer.length; i++) {
            if (this.buffer[i] && this.buffer[i].id != null && this.buffer[i].id < min) { min = this.buffer[i].id; index = i; isEmpty = false;}
        }
        if (!isEmpty) {
            value = this.buffer[index].value;
            this.buffer[index] = { value: null, id: null };
            return value;
        } else {
            throw new BufferEmptyError("Buffer is Empty");
        }
    }

    write(value) {
        let isEmptyCellFound = false; let index;
        for (let i = 0; i < this.buffer.length; i++) {
            if (this.buffer[i] == null || ( this.buffer[i] != null && this.buffer[i].value == null) ) {
                isEmptyCellFound = true; index = i; break;
            }
        }
        if (isEmptyCellFound) { this.id++; this.buffer[index] = { value, id: this.id }; }
        else { throw new BufferFullError("Buffer is Full"); }
        console.log(this.buffer);
        
    }

    forceWrite(value) {
        try {
            this.write(value);
        } catch(e) {
            if (e instanceof BufferFullError) {
                let min = 100000; let index;
                for (let i = 0; i < this.buffer.length; i++) {
                    if (this.buffer[i] && this.buffer[i].id < min) { min = this.buffer[i].id; index = i; }
                }
                this.id++; this.buffer[index] = { value, id: this.id };
            }
        }
    }

    clear() {
        for (let i = 0; i < this.buffer.length; i++) {
            this.buffer[i] = {value: null, id: null}
        }
    }
}
  

class BufferFullError extends Error {}

class BufferEmptyError extends Error {}
 
const circularBuffer = (size) => {
    return new CircularBuffer(size);
}

export {
    circularBuffer as default,
    BufferFullError,
    BufferEmptyError,
};