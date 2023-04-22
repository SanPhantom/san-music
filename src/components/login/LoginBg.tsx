import LoginBgImg from "../../assets/login-bg.png";

const LoginBg = () => {
  return (
    <img
      src={LoginBgImg}
      alt="login-bg"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: -1,
        objectFit: "cover",
      }}
    />
  );
};

export default LoginBg;
