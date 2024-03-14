import ShadowLogo from "../../assets/DOONZ_LOGO_shadow.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

function Home() {
  useGSAP(() => {
    gsap.from(".doonzlogo", { x: 360, opacity: 0, delay: 0.6 }); 
  }); 
  return (
    <>
      <div className="w-full flex items-start justify-evenly h-[110vh]">
        <div className="lg:grid lg:grid-cols-2 flex flex-col justify-evenly h-[50vh] xl:max-w-[1280px] w-full mt-[15vw] relative z-10  m-0 overflow-hidden">
        <div className="flex flex-col items-center mt-[50px]">
          <h3 className="text-white text-6xl">Welcome to the world of</h3>
          <img className="doonzlogo" src={ShadowLogo} alt="bug" width={300} />

        </div>
        <div className="flex flex-col gap-10 text-white text-3xl text-center ">
          <h3>
          Where pixel art meets passion and community! 
          </h3>
          <h3>
          Doonz is more than just pixel art - it is a lovely community-driven project fueled by excitement and creativity.  
          </h3>
          <h3>
          Each NFT is a reflection of the dedication and enthusiasm of our community. </h3>
        </div>
        </div>
      </div>
    </>
  );
}

export default Home;
