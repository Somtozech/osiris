const SuccessMsg = ({ url, closeToast }) => {
  return (
    <>
      <div style={{ padding: 10 }} onClick={closeToast}>
        Minting successful.{" "}
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>
      </div>
    </>
  );
};

export default SuccessMsg;
