import useHome from "./hooks/useHome";
import Default from "./components/Default";
import NewMeet from "./components/NewMeet";
import ExistingMeet from "./components/ExistingMeet";
function Home() {
  const { homeState, setHomeState } = useHome();
  return (
    <div className="flex justify-center items-center w-full h-full">
      {homeState === "default" && <Default toggle={setHomeState} />}
      {homeState === "enjoy" && <ExistingMeet toggle={setHomeState} />}
      {homeState === "new meet" && <NewMeet toggle={setHomeState} />}
    </div>
  );
}

export default Home;
