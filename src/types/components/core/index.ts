export interface ProfileType {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    avatar: string;
    gender: string;
    bvn: string;
    address: string;
    currency: string;
  }
  export interface GuarantorType {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    address: string;
  }
  
  export interface IUser {
    id: string;
    createdAt: string;
    orgName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    lastActiveDate: string;
    profile: ProfileType;
    guarantor: GuarantorType;
    accountBalance: string;
    accountNumber: string;
    status: string;
    socials: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
    education: {
      level: string;
      employmentStatus: string;
      sector: string;
      duration: string;
      officeEmail: string;
      monthlyIncome: string[];
      loanRepayment: string;
    };
  }
  export interface UsersOverviewType {
    allUsers: number;
    activeUsers: number;
    userWithLoans: number;
    usersWithSavings: number;
  }
  export interface UserContextType {
    users: IUser[];
    userDetails: IUser | null;
    updateUser: (id: string, currentUsers: IUser[], status: string) => void;
    getUsers: () => Promise<IUser[] | void>;
    getUser: (id: any) => Promise<IUser | void>;
    usersOverview: UsersOverviewType;
    loading: boolean;
    LogOut: () => string;
  }
  
  export interface CoreProps {
    children?: React.ReactNode;
  }