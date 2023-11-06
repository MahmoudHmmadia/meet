import Container from "../../components/Container";
import Form from "../../components/Form";

function Register() {
  return (
    <>
      <Container>
        <div className="flex flex-col gap-8 items-center justify-center m-auto lg:w-4/12 md:w-6/12 sm:w-8/12 w-full">
          <Form type="register" />
        </div>
      </Container>
    </>
  );
}

export default Register;
