import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import {
  ActionIcon,
  ActivateIcon,
  BlacklistIcon,
  FilterIcon,
  ViewIcon,
} from "../icons";
import { UserContext } from "../../globalState";
import { IUser, UserContextType } from "../../types/components/core";

type RowProps = {
  openFilter: () => void;
  idx: number;
  user: IUser;
};

const UserRow = ({ user, idx, openFilter }: RowProps) => {
  const { users, updateUser } = useContext(UserContext) as UserContextType;

  const [current, setCurrent] = useState<number | null>(null);

  const { orgName, createdAt, userName, email, phoneNumber, status, id } = user;

  const handlAction = (val: string, userId: string) => {
    updateUser(userId, users, val);
    setCurrent(null);
  };
  return (
    <>
      <div className="row">
        <p className="tool_tip">
          <span className="text">
            {orgName.slice(0, 15)}
            {orgName.length > 15 && "..."}
          </span>{" "}
          <span className="tool_tiptext">{orgName}</span>
        </p>
        <p>{userName}</p>
        <p className="tool_tip">
          <span className="text">
            {email.slice(0, 17)}
            {email.length > 17 && ".."}
          </span>{" "}
          <span className="tool_tiptext">{email}</span>
        </p>
        <p>{phoneNumber}</p>
        <p> {createdAt}</p>
        <p>
          <span
            className={`${status === "pending" && "pending"} ${
              status === "blacklisted" && "blacklist"
            } ${status === "inactive" && "inactive"} ${
              status === "active" && "active"
            }`}
          >
            {status}
          </span>
          <div className="actions">
            <button
              type="button"
              onClick={() => {
                setCurrent(current === null ? idx : null);
              }}
            >
              <ActionIcon />
            </button>
            {current === idx && (
              <div className={`options open`}>
                <button>
                  <Link to={`/users/${id}`}>
                    <ViewIcon /> View Details
                  </Link>
                </button>
                <button onClick={() => handlAction("blacklisted", id)}>
                  <span>
                    <BlacklistIcon /> Blacklist User
                  </span>
                </button>
                <button onClick={() => handlAction("active", id)}>
                  <span>
                    <ActivateIcon /> Activate User
                  </span>
                </button>
              </div>
            )}
          </div>
        </p>
      </div>

      <div className="mobileRow">
        <div className="head">
          <button type="button" onClick={openFilter}>
            <FilterIcon />
          </button>
          <div className="actions">
            <button
              type="button"
              onClick={() => {
                setCurrent(current === null ? idx : null);
              }}
            >
              <ActionIcon />
            </button>
            {current === idx && (
              <div className={`options open`}>
                <button>
                  <Link to={`/users/${id}`}>
                    <ViewIcon /> View Details
                  </Link>
                </button>
                <button onClick={() => handlAction("blacklisted", id)}>
                  <span>
                    <BlacklistIcon /> Blacklist User
                  </span>
                </button>
                <button onClick={() => handlAction("active", id)}>
                  <span>
                    <ActivateIcon /> Activate User
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          <p>organization</p> <p>{orgName}</p>
        </div>
        <div>
          <p>username</p>
          <p>{userName}</p>
        </div>
        <div>
          <p>email</p>
          <p>{email}</p>
        </div>
        <div>
          <p>phone Number</p>
          <p>{phoneNumber}</p>
        </div>
        <div>
          <p>Date joined</p>
          <p>{createdAt}</p>
        </div>
        <div>
          <p>status</p>
          <p
            style={{ textAlign: "center" }}
            className={`${status === "pending" && "pending"} ${
              status === "blacklisted" && "blacklist"
            } ${status === "inactive" && "inactive"} ${
              status === "active" && "active"
            }`}
          >
            {status}
          </p>
        </div>
      </div>
    </>
  );
};

export default UserRow;
