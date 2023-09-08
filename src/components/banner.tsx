import React from "react";
import BannerImage from "../assets/images/Pokédex_logo.png";
import { ReactComponent as BackImg } from "../assets/images/Poké_Ball_icon.svg";
import useBoolean from "../hooks/useBoolean";
import ProfileModal from "../pages/profile/modal";
import { shallowEqual, useSelector } from "react-redux";
import { RootReducerState } from "../store/rootReducer";

const Banner = () => {
  const {
    value: isModalOpen,
    setFalse: closeModal,
    setTrue: openModal,
  } = useBoolean(false);

  const { data } = useSelector(
    ({ pokemonTeamReducer }: RootReducerState) => ({
      data: pokemonTeamReducer.data,
    }),
    shallowEqual
  );
  return (
    <>
      <div className="banner">
        <div />
        <img src={BannerImage} alt="Banner" />
        <div className="profile mr-4">
          <h4> My Team</h4>
          <div className="profile-team">
            <BackImg onClick={openModal} />
            <div className="count">{data.length || 0}</div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProfileModal
          data={data}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Banner;
