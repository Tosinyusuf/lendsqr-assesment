import React, { createContext } from "react";
import { getUsersApi } from "../api";
import dayjs from "dayjs";
import { compareDates, formatNumber } from "../utils";
import {
  IUser,
  UsersOverviewType,
  UserContextType,
  CoreProps,
} from "../types/components/core";

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: CoreProps) => {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [userDetails, setUserDetails] = React.useState<IUser | null>(null);

  const [usersOverview, setUsersOverview] = React.useState<UsersOverviewType>({
    allUsers: 0,
    activeUsers: 0,
    userWithLoans: 0,
    usersWithSavings: 0,
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const getUsers = async () => {
    setLoading(true);

    try {
      const res = await getUsersApi();
      let withLoans = 0;
      let withSavings = 0;
      let activeUsers = 0;
      let generated = res.data?.result?.map((user: IUser) => {
        if (
          Number(user?.accountBalance) -
            Number(user?.education?.loanRepayment) >
          1
        ) {
          withLoans += 1;
        } else {
          withSavings += 1;
        }

        if (compareDates(user.createdAt, user.lastActiveDate)) {
          activeUsers += 1;
          return {
            ...user,
            status: "inactive",
            createdAt: dayjs(user.createdAt).format("MMM D, YYYY h:mm A"),
            phoneNumber: formatNumber(user.phoneNumber),
          };
        } else {
          return {
            ...user,
            status: "pending",
            createdAt: dayjs(user.createdAt).format("MMM D, YYYY h:mm A"),
            phoneNumber: formatNumber(user.phoneNumber),
          };
        }
      });
      setUsers(generated);
      setUsersOverview({
        ...usersOverview,
        allUsers: res?.data.result.length,
        userWithLoans: withLoans,
        usersWithSavings: withSavings,
        activeUsers: activeUsers,
      });
    } catch (error) {
      console.log("something went wrong...");
    }
    setLoading(false);
  };
  const getUser = async (id: any) => {
    setLoading(true);
    try {
      const user = users.find((user: IUser | null) => user?.id === id);
      if (user) {
        setUserDetails(user);
      }
    } catch (error) {
      console.log("something went wrong...");
    }
    setLoading(false);
  };

  const updateUser = (id: string, currentUsers: IUser[], status: string) => {
    const userDetails = currentUsers.map((user) => {
      if (user.id === id) {
        return { ...user, status };
      }
      return user;
    });
    setUsers(userDetails);
  };

  const LogOut = () => {
    localStorage.removeItem("user");
    return "done";
  };
  return (
    <UserContext.Provider
      value={{
        loading,
        users,
        getUsers,
        updateUser,
        getUser,
        userDetails,
        usersOverview,
        LogOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
