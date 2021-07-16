import { useAmp } from "next/amp";

export const config = { amp: "hybrid" };

function SampleAMPHybrid(props) {
  const isAmp = useAmp();

  return (
    <div>
      <h3>My AMP About Page!</h3>
      {isAmp ? (
        <amp-img
          width="300"
          height="300"
          src="/images/logo.png"
          alt="a cool image"
          layout="responsive"
        />
      ) : (
        <img
          width="300"
          height="300"
          src="/images/logo.png"
          alt="a cool image"
        />
      )}
    </div>
  );
}

export default SampleAMPHybrid;
