import React, { useEffect } from "react";
import "./LaunchPadPage.scss";
import rocket from "../../assets/images/rocket.png";
import { useStore } from "../../store"; 
import SepoliaCard from "../../components/card/sepolia/sepoliaCard";
import MumbaiCard from "../../components/card/mumbai/mumbaiCard";
import PolygonCard from "../../components/card/polygon/polygonCard";
import ArbirtrumCard from "../../components/card/arbitrum/arbitrumCard";
import BsctestnetCard from "../../components/card/bsctestnet/bsctestnetCard";

const LaunchPadPage = () => {
  const { address, connected, selectedChain } = useStore(); 

  useEffect(() => {
    // console.log("Address:", address);
    console.log("Connected:", connected);
    // console.log("Selected Chain:", selectedChain);
  }, [connected]); 

  return (
    <div className="launchpad">
      <div className="container">
        <h1>IDO Projects</h1>
        <div className="row">
          <SepoliaCard address={address} connected={connected} selectedChain={selectedChain} />
          {/* <MumbaiCard />
          <PolygonCard />
          <ArbirtrumCard />
          <BsctestnetCard /> */}
        </div>
      </div>
    </div>
  );
};

export default LaunchPadPage;
