import React from "react";
import { IUser } from "../../types/components/core";
import loader from "../../assets/images/load-loading.gif";

type User = {
  userDetails: IUser | null;
  loading: boolean;
  tab: number;
};

const OtherUserInfo = ({ userDetails, loading, tab }: User) => {
  if (loading) {
    return (
      <div className="loading otherUserInfo">
        <img src={loader} alt="" />
      </div>
    );
  }
  if (tab === 0) {
    return (
      <div className="otherUserInfo">
        <div>
          <h5>Personal Information</h5>
          <div>
            <div>
              <h6>full Name</h6>
              <span>{userDetails?.profile?.firstName}</span>
            </div>
            <div>
              <h6>Phone Number</h6>
              <span>{userDetails?.profile?.phoneNumber}</span>
            </div>
            <div>
              <h6>Email Address</h6>
              <span>{userDetails?.email}</span>
            </div>
            <div>
              <h6>Bvn</h6>
              <span>{userDetails?.profile?.bvn}</span>
            </div>
            <div>
              <h6>Gender</h6>
              <span>{userDetails?.profile?.gender}</span>
            </div>
            <div>
              <h6>Marital status</h6>
              <span>Not Specified</span>
            </div>
            <div>
              <h6>Children</h6>
              <span>Not Specified</span>
            </div>
            <div>
              <h6>Type of residence</h6>
              <span>Not Specified</span>
            </div>
          </div>
        </div>
        <div>
          <h5>Education and Employment</h5>
          <div>
            <div>
              <h6>level of education</h6>
              <span>{userDetails?.education?.level}</span>
            </div>
            <div>
              <h6>employment status</h6>
              <span>{userDetails?.education?.employmentStatus}</span>
            </div>
            <div>
              <h6>sector of employment</h6>
              <span>{userDetails?.education?.sector}</span>
            </div>
            <div>
              <h6>Duration of employment</h6>
              <span>{userDetails?.education?.duration}</span>
            </div>
            <div>
              <h6>office email</h6>
              <span>{userDetails?.education?.officeEmail}</span>
            </div>
            <div>
              <h6>Monthly income</h6>
              <span>
                {userDetails?.education?.monthlyIncome.map((income, idx) =>
                  idx === 0 ? `#${income} - ` : `#${income}`
                )}
              </span>
            </div>
            <div>
              <h6>loan repayment</h6>
              <span>{userDetails?.education?.loanRepayment}</span>
            </div>
          </div>
        </div>
        <div>
          <h5>Socials</h5>
          <div>
            <div>
              <h6>Twitter</h6>
              <span>{userDetails?.socials?.twitter}</span>
            </div>
            <div>
              <h6>Facebook</h6>
              <span>{userDetails?.socials?.facebook}</span>
            </div>
            <div>
              <h6>Instagram</h6>
              <span>{userDetails?.socials?.instagram}</span>
            </div>
          </div>
        </div>
        <div>
          <h5>Guarantor</h5>
          <div>
            <div>
              <h6>full Name</h6>
              <span>
                {userDetails?.guarantor?.firstName}{" "}
                {userDetails?.guarantor?.lastName}
              </span>
            </div>
            <div>
              <h6>Phone Number</h6>
              <span>{userDetails?.guarantor?.phoneNumber}</span>
            </div>
            <div>
              <h6>Email Address</h6>
              <span>Not Specifield</span>
            </div>
            <div>
              <h6>Relationship</h6>
              <span>Not Specifield</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="otherUserInfo">
      <div className="nodata">No Available Data</div>
    </div>
  );
};

export default OtherUserInfo;
