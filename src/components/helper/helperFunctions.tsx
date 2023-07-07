import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

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

const saveToPDF = (name = "unknown", contact = "9999999999") => {
  const dom = document.getElementById("print")!;
  toPng(dom)
    .then((dataUrl) => {
      const img = new Image();
      img.crossOrigin = "annoymous";
      img.src = dataUrl;
      img.onload = () => {
        // Initialize the PDF.
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: [5.5, 8.5],
        });

        // Define reused data
        const imgProps = pdf.getImageProperties(img);
        const imageType = imgProps.fileType;
        const pdfWidth = pdf.internal.pageSize.getWidth();

        // Calculate the number of pages.
        const pxFullHeight = imgProps.height;
        const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
        const nPages = Math.ceil(pxFullHeight / pxPageHeight);

        // Define pageHeight separately so it can be trimmed on the final page.
        let pageHeight = pdf.internal.pageSize.getHeight();

        // Create a one-page canvas to split up the full image.
        const pageCanvas = document.createElement("canvas")!;
        const pageCtx = pageCanvas.getContext("2d")!;
        pageCanvas.width = imgProps.width;
        pageCanvas.height = pxPageHeight;

        for (let page = 0; page < nPages; page++) {
          // Trim the final page to reduce file size.
          if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
            pageCanvas.height = pxFullHeight % pxPageHeight;
            pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
          }
          // Display the page.
          const w = pageCanvas.width;
          const h = pageCanvas.height;
          pageCtx.fillStyle = "white";
          pageCtx.fillRect(0, 0, w, h);
          pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

          // Add the page to the PDF.
          if (page) pdf.addPage();

          const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
          pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
        }
        // Output / Save
        pdf.save(`${name}_${contact}_Invoice.pdf`);
        return "PDF has been saved!";
      };
    })
    .catch((error) => {
      console.error("oops, something went wrong!", error);
      return "PDF has not been saved!";
    });
};

const exportToCSV = (fileName: string, input_data: any) => {
  console.log("fileName : " + fileName);
  console.log(input_data);
  const csvData = input_data;
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};

const todaysDate = () => {};
export {
  ErrorHandler,
  GreetingMessage,
  sortedList,
  filteredList,
  paginationList,
  getFormatedDate,
  saveToPDF,
  exportToCSV,
};
