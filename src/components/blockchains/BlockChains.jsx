import image1 from "../../assets/images/image-1.png";
import image2 from "../../assets/images/image-2.png";
import image3 from "../../assets/images/image-3.png";
import image4 from "../../assets/images/image-4.png";
import image5 from "../../assets/images/image-5.png";
import image6 from "../../assets/images/image-6.png";
import image7 from "../../assets/images/image-7.png";
import image8 from "../../assets/images/image-8.png";
import trust from "../../assets/images/trust.png";
import cross from "../../assets/images/cross.png";
import "./BlockChains.scss";

const BlockChains = () => {
  return (
    <section className="blockchain">
      <div className="container">
        <h1>Supported BlockChains</h1>
        <div className="blockchain__icons">
          <img src={image1} alt="ethereum" />
          <img src={image2} alt="bnb" />
          <img src={image3} alt="dash" />
          <img src={image4} alt="l" />
          <img src={image5} alt="empty" />
          <img src={image6} alt="polygon" />
          <img src={image7} alt="polygon" />
          <img src={image8} alt="polygon" />
        </div>

        <div className="row">
          <div className="col col--1">
            <img src={trust} alt="trust" />
            <div className="text-box">
              <h2>Transparency and trust</h2>
              <p>
                AquaEth fosters an inclusive community where token holders have
                voting rights and actively participate in decentralized
                governance processes. This transparency ensures that important
                decisions regarding the platform, such as upgrades and fee
                structures, are made collectively and fairly, enhancing trust
                among users and stakeholder
              </p>
            </div>
          </div>

          <div className="col col--2">
            <img src={cross} alt="cross-chain" />
            <div className="text-box">
              <h2>Cross-chain Technology</h2>
              <p>
                AquaEth acts as a bridge between Ethereum and multiple
                blockchain networks, including Binance Smart Chain, Polkadot,
                Solana, and more. Through various cross-chain communication
                protocols, AquaEth enables projects to effortlessly deploy their
                tokens and DApps on different chains. This integration not only
                promotes interoperability but also allows AquaEth to tap into a
                diverse user base and liquidity pool across various chains,
                demonstrating its commitment to providing a robust and versatile
                cross-chain solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlockChains;
