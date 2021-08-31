const SuccessMsg = ({ url }) => {
  return (
    <>
      <div style={{ padding: 10 }}>
        Minting successful.{" "}
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      </div>
    </>
  );
};

export default SuccessMsg;
