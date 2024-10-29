import React from "react";
import { IUser } from "../../types/components/core";
import { ProfileAvatar, RatingFill, RatingIcon } from "../icons";
import loader from "../../assets/images/load-loading.gif";

type User = {
  userDetails: IUser | null;
  loading: boolean;
  switchTab: (val: number) => void;
  tab: number;
};

const ProfileCard = ({ userDetails, loading, switchTab, tab }: User) => {
  return (
    <div className="profileCard">
      {loading && (
        <div className="loading">
          <img src={loader} alt="" />
        </div>
      )}

      {!loading && (
        <div className="profileData">
          <div>
            <span className="avatar">
              {userDetails?.profile?.avatar ? (
                <ProfileAvatar />
              ) : (
                <ProfileAvatar />
              )}
            </span>
            <div>
              <h3>{userDetails?.profile?.firstName}</h3>
              <p>{userDetails?.profile?.lastName}</p>
            </div>
          </div>
          <div>
            <p>User’s Tier</p>
            <div className="ratings">
              <RatingFill />
              <RatingIcon />
              <RatingIcon />
            </div>
          </div>
          <div>
            <h3>₦{userDetails?.accountBalance}</h3>
            <p>{userDetails?.accountNumber}</p>
          </div>
        </div>
      )}

      <div className="userDetailsNav">
        <ul>
          <li
            className={`${tab === 0 && "active"}`}
            onClick={() => switchTab(0)}
          >
            General Details
          </li>
          <li
            className={`${tab === 1 && "active"}`}
            onClick={() => switchTab(1)}
          >
            Documents
          </li>
          <li
            className={`${tab === 2 && "active"}`}
            onClick={() => switchTab(2)}
          >
            Bank Details
          </li>
          <li
            className={`${tab === 3 && "active"}`}
            onClick={() => switchTab(3)}
          >
            Loans
          </li>
          <li
            className={`${tab === 4 && "active"}`}
            onClick={() => switchTab(4)}
          >
            Savings
          </li>
          <li
            className={`${tab === 5 && "active"}`}
            onClick={() => switchTab(5)}
          >
            App and System
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
