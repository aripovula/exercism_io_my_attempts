class CircularBuffer {
    constructor(size) {
      this.buffer = [];
      this.size = size;
    }
  
    read() {
        if (Object.values(this.buffer).length == 0) {
            throw new BufferEmptyError("Buffer is Empty");
        } else {
            return this.buffer.pop();
        }        
    }

    write(value) {
        if (this.buffer.length == this.size) {
            throw new BufferFullError("Buffer is Full");
        } else if (value != null) {
            this.buffer.unshift(value);
        }        
    }

    forceWrite(value) {
        try {
            this.write(value);
        } catch(e) {
            if (e instanceof BufferFullError) {
                this.buffer.splice(this.size - 1, 1);    
                this.buffer.unshift(value);
            }
        }
    }

    clear() { this.buffer = []; }
}
  
class BufferFullError extends Error {}

class BufferEmptyError extends Error {}
 
const circularBuffer = (size) => {
    return new CircularBuffer(size);
}

export { circularBuffer as default, BufferFullError, BufferEmptyError };