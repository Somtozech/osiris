import { create } from "ipfs-http-client";

const ipfsClientOptions = {
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
};

export default create(ipfsClientOptions);
