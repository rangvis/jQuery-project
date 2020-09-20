// 区分环境

let mod = process.argv[2];

// console.log(mod)

switch (mod) {
    case "build":
        require("./gulpfile.build")
        break;
    case "dev":
        require("./gulpfile.dev")
        break;
}