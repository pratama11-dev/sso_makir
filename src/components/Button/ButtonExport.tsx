import { PrinterOutlined } from "@ant-design/icons";
import API_ENDPOINT from "@api/apiEndpoint";
import useAuth from "@api/customHooks/useAuth";
import useFetcher, {
  IFetcherGetParams,
  IFetcherPostParams,
} from "@api/customHooks/useFetcher";
import { handlingError } from "@pages/_app";
import { Button } from "antd";
import { useState } from "react";
import { MdPrint } from "react-icons/md";
import { Sessions } from "types/Session";

interface props {
  session: Sessions;
  pdfApi: string;
  excelAPI: string;
  params?: object;
  disable?: boolean;
  method?: "POST" | "GET";
}

function ButtonExport({
  session,
  pdfApi,
  excelAPI,
  params = {},
  disable,
  method = "POST",
}: props) {
  const [isLoading, setLoading] = useState({ pdf: false, excel: false });
  const { FetcherPost, FetcherGet } = useFetcher(session);
  const { handleLogout } = useAuth(session);

  const handleExport = async (
    type: "pdf" | "excel",
    Method: "POST" | "GET"
  ) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    try {
      const urlExport = type === "pdf" ? pdfApi : excelAPI;
      const fetchParams: IFetcherGetParams | IFetcherPostParams = {
        url: urlExport,
        api: "API",
      };
      const Fetch = Method === "POST"
        ? FetcherPost({ ...fetchParams, data: params || "" })
        : FetcherGet(fetchParams);
      Fetch.then(async (res) => {
        const title = res.data.data.split("/")[3];
        const url = API_ENDPOINT.API + res.data.data;

        const response = await fetch(url);
        const blob = await response.blob();
        const urlFile = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = urlFile;
        a.download = title;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    } catch (err) {
      handlingError(err, handleLogout);
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {pdfApi && (
        <Button
          disabled={disable}
          onClick={() => handleExport("pdf", method)}
          icon={<MdPrint />}
          loading={isLoading.pdf}
          ghost
          type="link"
          style={{ marginRight: "10px" }}
        >
          Export to PDF
        </Button>
      )}
      {excelAPI && (
        <Button
          disabled={disable}
          onClick={() => handleExport("excel", method)}
          icon={<MdPrint />}
          loading={isLoading.excel}
          ghost
          type="link"
          // style={{ marginRight: "10px" }}
        >
          Export to Excel
        </Button>
      )}
    </div>
  );
}

export default ButtonExport;
