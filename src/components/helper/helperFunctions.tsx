const ErrorHandler = (e: any, action: string): string => {
  if (action === "CUSTOMER_ADD") {
    const email = e.response.data.keyValue.email;
    const contact = e.response.data.keyValue.contact;
    if (email) {
      return `Entered ${email} is already registered!`;
    }
    if (contact) {
      return `Entered ${contact} is already registered!`;
    } else {
      return `Check network connection or contact to admin`;
    }
  }

  if (e.status === 401) {
    return `You are not authorized to access this page`;
  }
  return "";
};

const GreetingMessage = () => {
  let greeting = "";
  let date = new Date();
  let current_time = date.getHours();
  if (current_time < 12) {
    greeting = "Good Morning";
  } else if (current_time < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }
  return greeting;
};

const sortedList = (list: any, sortBy: string, type = "desc"): any => {
  let sorted;
  if (type === "asc") {
    console.log("ascending sort");
    sorted = list.sort((a: any, b: any) => {
      if (a[sortBy] > b[sortBy]) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  if (type === "desc") {
    sorted = list.sort((a: any, b: any) => {
      if (a[sortBy] < b[sortBy]) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  return sorted;
};

const filteredList = (list: any, filterString: any, filterBy: any) => {
  let transformedList;
  let filteredCustomers;

  if (filterString === "") {
    return list;
  }
  if (filterBy === "contact") {
    transformedList = list.map((obj: any) => {
      return { ...obj, contact: obj.contact.toString() };
    });

    filteredCustomers = transformedList.filter((customer: any) =>
      customer[filterBy].includes(filterString)
    );
  } else {
    filteredCustomers = list.filter((customer: any) =>
      customer[filterBy].includes(filterString)
    );
  }
  return filteredCustomers;
};

const paginationList = (list: any, start: number, itemsPerPage: number) => {
  return list.slice(start, itemsPerPage);
};

const getFormatedDate = (timeStamp: any) => {
  const formatedDate = new Date(timeStamp).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return formatedDate;
};
export {
  ErrorHandler,
  GreetingMessage,
  sortedList,
  filteredList,
  paginationList,
  getFormatedDate,
};
