import { createContext, useState } from "react";

export const FlexWorkContext = createContext();

const FlexWorkContextProvider = ({ children }) => {
  let [user, setUser] = useState({});

  const [freelancerProfile, setFreelancerProfile] = useState({
    _id: "",
    title: "",
    description: "",
    skills: [],
    userId: "",
  });

  const [clientProfile, setClientProfile] = useState({
    _id: "",
    companyName: "",
    description: "",
    isVerified: false,
    userId: "",
  });

  const [skeletonLoading, setSkeletonLoading] = useState(false);

  const [clientProjectPostDetails, setClientProjectPostDetails] = useState({
    title: "",
    description: "",
    category: "",
    skills: [],
    scope: "small",
    duration: "1 month",
    experienceType: "fresher",
    projectRate: "",
    file: "",
    userId: "",
    company: "",
  });

  const [refresh, setRefresh] = useState(0);

  return (
    <FlexWorkContext.Provider
      value={{
        user,
        setUser,
        freelancerProfile,
        setFreelancerProfile,
        refresh,
        setRefresh,
        clientProfile,
        setClientProfile,
        clientProjectPostDetails,
        setClientProjectPostDetails,
        skeletonLoading,
        setSkeletonLoading,
      }}
    >
      {children}
    </FlexWorkContext.Provider>
  );
};

export default FlexWorkContextProvider;
