import { GenerationListType } from "../../types";
import { ReactComponent as BackImg } from "../../assets/images/arrow-back.svg";

interface EvolutionType {
  ImageUrl: string;
  name: string;
  evolutionInfo: GenerationListType[];
}

const Evolution = ({ ImageUrl, name, evolutionInfo }: EvolutionType) => {
  return (
    <>
      <div className="evolution">
        <div className="evolution-card">
          <img src={ImageUrl} alt={name} />
        </div>
        <BackImg />
        {evolutionInfo.length > 0 &&
          evolutionInfo.map((item, index) => (
            <>
              <div className="evolution-card">
                <img src={item.url} alt={evolutionInfo[index].name} />
              </div>
              {evolutionInfo.length - 2 === index && <BackImg />}
            </>
          ))}
      </div>
    </>
  );
};

export default Evolution;
