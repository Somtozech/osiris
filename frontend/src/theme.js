const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderWidth: 2,
  borderRadius: 10,
  borderColor: "#d8d4d4",
  borderStyle: "dashed",
  color: "#bdbdbd",
  outline: "none",
  fontSize: "18px",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  // borderColor: "#2196f3",''
  borderColor: "rgb(8, 253, 216)",
};

const acceptStyle = {
  borderColor: "rgb(8, 253, 216)",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export { baseStyle, acceptStyle, activeStyle, rejectStyle };
