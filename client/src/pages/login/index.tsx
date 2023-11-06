import Container from "../../components/Container";
import Form from "../../components/Form";

function Login() {
  return (
    <>
      <Container>
        <div className="flex flex-col gap-8 items-center justify-center m-auto lg:w-4/12 md:w-6/12 sm:w-8/12 w-full">
          <div className="image flex items-center">
            <h1 className="text-4xl text-main uppercase">login</h1>
            <img src="/logo2.png" width={80} alt="" />
          </div>
          <Form type="login" />
        </div>
      </Container>
    </>
  );
}

export default Login;
