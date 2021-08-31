export function readFileAsBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onabort = () => reject(new Error("file reading was aborted"));
    reader.onerror = () => reject(new Error("file reading has failed"));
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsArrayBuffer(file);
  });
}

export function createURLFromFile(file) {
  return URL.createObjectURL(file);
}
