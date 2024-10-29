import { useEffect, useRef, useState } from "react";
import { IUser } from "../../types/components/core";
import TableHead from "./TableHead";
import UserRow from "./UserRow";
import loader from "../../assets/images/load-loading.gif";
import Btn from "../Button";
import { DateIcon } from "../icons";

export type FilterPayload = {
  username: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  date: string | undefined;
  org: string | undefined;
  status: string | undefined;
};

type UserType = {
  filterUsers: IUser[];
  users: IUser[];
  loading: boolean;
  handleReset: () => void;
  handleFilter: (payload: FilterPayload | undefined) => void;
};

const UsersTable = ({
  filterUsers,
  users,
  loading,
  handleFilter,
  handleReset,
}: UserType) => {
  const [orgNames, setOrgNames] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [dateValue, setdateValue] = useState<string>("");

  const dateRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const orgRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const orgnames = users.map((user) => user.orgName);
    setOrgNames(orgnames);
  }, [users]);

  const openDate = () => {
    dateRef.current?.showPicker();
  };

  const handleFilterUsers = () => {
    const payload = {
      username: usernameRef?.current?.value,
      email: emailRef?.current?.value,
      phone: phoneRef?.current?.value,
      date: dateValue,
      org: orgRef?.current?.value,
      status: statusRef?.current?.value,
    };
    handleFilter(payload);
    setIsFilterOpen(false);
  };

  return (
    <div className="usertable">
      <TableHead openFilter={() => setIsFilterOpen(!isFilterOpen)} />
      {loading && (
        <div className="loading">
          <img src={loader} alt="" />
        </div>
      )}
      {!loading &&
        filterUsers.map((data, idx) => (
          <UserRow
            user={data}
            openFilter={() => setIsFilterOpen(!isFilterOpen)}
            idx={idx}
          />
        ))}
      {!loading && filterUsers.length < 1 && (
        <div className="notFound">
          <div>
            <p>No Data</p>
            <Btn
              title="Reset"
              action={() => {
                handleReset();
                setIsFilterOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {isFilterOpen && (
        <div className="filter">
          <div className="close">
            <button type="button" onClick={() => setIsFilterOpen(false)}>
              x
            </button>
          </div>

          <div className="group">
            <h6>Organization</h6>
            <select name="organization" ref={orgRef}>
              <>
                <option selected value="" disabled className="default">
                  Select
                </option>
                {orgNames.map((orgName) => (
                  <option value={orgName}>{orgName}</option>
                ))}
              </>
            </select>
          </div>
          <div className="group">
            <h6>Username</h6>
            <input type="text" placeholder="Username" ref={usernameRef} />
          </div>
          <div className="group">
            <h6>Email</h6>
            <input placeholder="Email" type="text" ref={emailRef} />
          </div>
          <div className="group">
            <h6>Date</h6>
            <div className="date">
              <input
                type="date"
                name="date"
                value={dateValue}
                ref={dateRef}
                onChange={(e) => setdateValue(e.target.value)}
              />
              <span onClick={openDate}>
                {dateValue || "Date"} <DateIcon />
              </span>
            </div>
          </div>
          <div className="group">
            <h6>Phone Number</h6>
            <input type="number" placeholder="Phone Number" ref={phoneRef} />
          </div>
          <div className="group">
            <h6>Status</h6>
            <select name="" ref={statusRef}>
              <option value="" disabled selected>
                Status
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blacklist">Blacklist</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="btnGroup">
            <Btn
              title="Reset"
              action={() => {
                handleReset();
                setIsFilterOpen(false);
              }}
            />
            <Btn title="Filter" primary action={() => handleFilterUsers()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
