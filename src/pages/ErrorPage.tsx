import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <div style={{ marginTop: 16 }}>
        <code>{error?.statusText || error?.message}</code>
      </div>
    </div>
  );
};

export default ErrorPage;
