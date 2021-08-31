import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import IpfsClient from "./utils/ipfs";
import TokenArtifact from "./contracts/Token.json";
import contractAddress from "./contracts/contract-address.json";
import Icon from "./components/Icon";
import SuccessMsg from "./components/UploadSucessMessage";
import { acceptStyle, baseStyle, rejectStyle, activeStyle } from "./theme";
import { readFileAsBuffer, createURLFromFile } from "./utils/files";
import requestAccount from "./utils/requestAccount";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tokenContract, setContract] = useState(null);

  // initalize contract
  const initializeContract = () => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);

    const TokenContract = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      signer
    );

    setContract(TokenContract);
  };

  useEffect(() => {
    requestAccount();
    initializeContract();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
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

  const uploadSubmit = async () => {
    if (!file) return;

    // request user to select address for transaction
    const canProceed = await requestAccount();

    if (!canProceed) return;

    const id = toast.loading("Processing...");

    setLoading(true);

    try {
      const buffer = await readFileAsBuffer(file);
      const { path } = await IpfsClient.add(buffer);

      const tokenURI = `https://ipfs.io/ipfs/${path}`;

      const transaction = await tokenContract.mint(tokenURI);

      await transaction.wait();

      toast.update(id, {
        render: <SuccessMsg url={tokenURI} />,
        type: "success",
        isLoading: false,
      });

      setFile(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.update(id, {
        render: "Upload Failed",
        type: "error",
        isLoading: false,
      });
    }
  };

  return (
    <div className="container">
      <ToastContainer autoClose={8000} pauseOnHover position="top-right" />
      <section className="upload-section">
        <h1>Create Item</h1>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />

          {file ? (
            <div className="preview">
              <img src={createURLFromFile(file)} alt="file-upload" />
              <span>change</span>
            </div>
          ) : (
            <div className="file-upload">
              <Icon width="64" height="64" />
              <p>
                Drop Files here or{" "}
                <span style={{ color: "#11DBBC" }}> Browse</span>
              </p>
            </div>
          )}
        </div>
        <div className="center">
          <button disabled={loading} onClick={uploadSubmit}>
            {loading ? "..." : "Mint"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
