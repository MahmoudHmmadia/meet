import Button from "../../../components/Button";

function BackToDefault({ fn }: { fn: () => void }) {
  return <Button bg="bg-rose-500" content="back to home" fn={fn} />;
}

export default BackToDefault;
