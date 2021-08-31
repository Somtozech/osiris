import React, { useState, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Icon from "./components/Icon";
import { acceptStyle, baseStyle, rejectStyle, activeStyle } from "./styles";

import "./App.css";

function App() {
  const [buffer, setBuffer] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      setBuffer(reader.result);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*", maxFiles: 1, onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="container">
      <section className="upload-section">
        <h1>Create Item</h1>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <Icon width="64" height="64" />
          <p>
            Drop Files here or <span style={{ color: "#11DBBC" }}> Browse</span>
          </p>
        </div>
        <div className="center">
          <button>Upload</button>
        </div>
      </section>
    </div>
  );
}

export default App;
