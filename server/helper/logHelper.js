const util = require("util");

const colors = {
  // Animations
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  // Foreground colors
  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgLBlue: "\x1b[1;34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  // Background colors
  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
};

function fullInfo(msg) {
  console.log(`${colors.FgCyan}%s${colors.FgWhite}`, msg);
}

function infoLog(msg) {
  let msgToPrint = `### [${new Date().toLocaleString("en-IN", {
    timeZone: "IST",
  })}] ${colors.FgBlue}Info: ${colors.FgWhite}%s`;
  if (msg.includes("entry")) {
    msgToPrint = "\n" + msgToPrint;
  } else if (msg.includes("exit")) {
    msgToPrint = msgToPrint + "\n";
  }
  console.log(msgToPrint, msg);
}

function resultLog(methodName, msg) {
  if (Buffer.isBuffer(msg)) {
    msg = msg?.toString();
  }

  console.log(
    `*** [${new Date().toLocaleString("en-IN", { timeZone: "IST" })}] ${
      colors.FgYellow
    }Result: ${colors.FgWhite}%s =>`,
    methodName
  );
  log(msg);
}

function successLog(msg) {
  console.log(
    `>> [${new Date().toLocaleString("en-IN", { timeZone: "IST" })}] ${
      colors.FgGreen
    }Success: ${colors.FgWhite}%s`,
    msg
  );
}

function errorLog(msg) {
  console.log(
    `>>> [${new Date().toLocaleString("en-IN", { timeZone: "IST" })}] ${
      colors.FgRed
    }Error: ${colors.FgWhite}`
  );
  log(msg);
}

function log(msg) {
  console.log(
    util.inspect(msg, { showHidden: false, depth: null, colors: true })
  );
}

module.exports = {
  fullInfo,
  errorLog,
  successLog,
  resultLog,
  infoLog,
};
