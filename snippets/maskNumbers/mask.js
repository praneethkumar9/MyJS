const mask = (str, maskChar = "#") =>
  str.slice(-4).padStart(str.length, maskChar)