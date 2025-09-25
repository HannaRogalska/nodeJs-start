import EventEmitter from "events";

const emitter = new EventEmitter();
export const processArv = () => {
const arg = process.argv[2];
    emitter.on("check",(value) => {
        if (value !== "Hanna") {
          console.log(value);
        } else {
          console.log("Hello", value);
        }
    })
    
    if (!arg) {
      console.log("Error");
      process.exit(1);
    }
    
    emitter.emit("check", arg);
}


