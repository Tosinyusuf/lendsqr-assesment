import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../globalState";
import { IUser, UserContextType } from "../../types/components/core";
import Cards from "./Cards";
import Pagination from "./Pagination";
import "./Users.scss";
import UsersTable from "./UsersTable";

const Users = () => {
  const { loading, users, usersOverview } = useContext(
    UserContext
  ) as UserContextType;
  const [filterUsers, setfilterUsers] = useState<IUser[]>(users);

  useEffect(() => {
    setfilterUsers(users);
  }, [users]);

  const [postPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPage = currentPage * postPerPage;
  const indexOfFirstPage = indexOfLastPage - postPerPage;
  const currentTemplate = filterUsers?.slice(indexOfFirstPage, indexOfLastPage);
  const numberOfPages = Math.ceil(filterUsers?.length / postPerPage);

  const previous = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      alert("last page");
    }
  };
  const next = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    } else {
      alert("last page");
    }
  };

  const filterSearch = (val: any) => {

    const filtered = users.filter((user) => {
      const formattedDate = new Date(user.createdAt)
        .toISOString()
        .split("T")[0];

      // Create a lowercase version of each field for case-insensitive comparison
      const userStatus = user.status.toLowerCase();
      const userOrgName = user.orgName.toLowerCase();
      const userUserName = user.userName.toLowerCase();
      const userEmail = user.email.toLowerCase();
      const userPhone = user.phoneNumber.toLowerCase();

      const statusMatch = val.status
        ? userStatus.includes(val.status.toLowerCase())
        : true;
      const orgNameMatch = val.org
        ? userOrgName.includes(val.org.toLowerCase())
        : true;
      const userNameMatch = val.username
        ? userUserName.includes(val.username.toLowerCase())
        : true;
      const userPhoneMatch = val.phone
        ? userPhone.includes(val.phone.toLowerCase())
        : true;
      const emailMatch = val.email
        ? userEmail.includes(val.email.toLowerCase())
        : true;
      const dateMatch = val.date ? formattedDate === val.date : true;

      // Return true if all conditions match
      return (
        statusMatch &&
        orgNameMatch &&
        userNameMatch &&
        userPhoneMatch &&
        emailMatch &&
        dateMatch
      );
    });

    setfilterUsers(filtered);
  };

  const handleFilter = (val: any) => {
    filterSearch(val);
  };

  const handleReset = () => {
    setfilterUsers(users);
  };
  return (
    <div className="users">
      <h3>Users</h3>
      <Cards usersOverview={usersOverview} loading={loading} />
      <UsersTable
        filterUsers={currentTemplate}
        loading={loading}
        users={users}
        handleReset={handleReset}
        handleFilter={(val) => handleFilter(val)}
      />
      <Pagination
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        next={next}
        previous={previous}
        setPage={(val) => setCurrentPage(val)}
      />
    </div>
  );
};

export default Users;
