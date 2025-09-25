
export const processArv = () => {
    const arg = process.argv[2]
    if (!arg) {
      console.log("Error");
      process.exit(1);
    }
    if (arg !== "Hanna") {
        console.log(arg)
    } else {
        console.log("Hello", arg);
    }

    
}


