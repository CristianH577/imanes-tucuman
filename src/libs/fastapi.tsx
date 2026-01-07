import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

const defaultAlert = {
  bool: false,
  status: 0,
  value: "",
  title: "",
  detail: "Sin mensaje",
  variant: "default",
};
const variants = {
  200: "success",
  202: "warning",
  206: "info",
  500: "error",
};
var alert = structuredClone(defaultAlert);

const analyzeResponse = (response: AxiosResponse<any, any, {}>) => {
  alert.status = response.status;
  alert.title = response.data?.title;
  alert.detail = response.data?.detail || "";
  alert.value = response.data?.value;

  if (alert.status >= 200 && alert.status < 300) alert.bool = true;

  if (alert.status in variants) {
    alert.variant = variants[alert.status as keyof typeof variants];
  }

  if ([202, 206].includes(alert.status)) {
    alert.title = response.data.detail?.title;
    alert.detail = response.data.detail?.detail;
  }
};
const analyzeError = (e: any) => {
  alert.title = "ERROR";
  alert.detail = "";

  if (["ERR_NETWORK", "ERR_BAD_RESPONSE"].includes(e.code)) {
    alert.status = 500;
    alert.detail = "De servidor";
  } else if (e.code === "ERR_BAD_REQUEST") {
    alert.status = e.response?.status || e.response.request.status;
  }

  if (alert.status) {
    alert.variant = "error";
    if (alert.status < 500) {
      const res_detail = e?.response?.data?.detail;

      if (Array.isArray(res_detail)) {
        alert.detail = res_detail[0]?.msg;
      } else {
        alert.detail = res_detail;
      }
    }
  }
};

export const fastapi = {
  get: getFAPI,
  post: postFAPI,
  put: putFAPI,
  delete: deleteFAPI,
  getImg: imgFAPI,
};

export async function getFAPI(action: string) {
  alert = structuredClone(defaultAlert);

  await client
    .get(action)
    .then((response) => analyzeResponse(response))
    .catch((e) => analyzeError(e));

  return alert;
}

export async function postFAPI(action: string, data: any) {
  alert = structuredClone(defaultAlert);

  await client
    .post(action, data)
    .then((response) => analyzeResponse(response))
    .catch((e) => analyzeError(e));

  return alert;
}

export async function deleteFAPI(action: string) {
  alert = structuredClone(defaultAlert);

  await client
    .delete(action)
    .then((response) => analyzeResponse(response))
    .catch((e) => analyzeError(e));

  return alert;
}

export async function putFAPI(action: string, data: any) {
  alert = structuredClone(defaultAlert);

  await client
    .put(action, data)
    .then((response) => analyzeResponse(response))
    .catch((e) => analyzeError(e));

  return alert;
}

export async function imgFAPI(action: string) {
  alert = structuredClone(defaultAlert);

  const configClient: AxiosRequestConfig<any> = {
    responseType: "blob",
  };

  await client
    .get(action, configClient)
    .then((response) => {
      const url = URL.createObjectURL(response.data);

      alert.bool = true;
      alert.value = url;
    })
    .catch((e) => {
      if (e?.response?.data) {
        var reader = new FileReader();
        reader.onload = function (x) {
          const texto = x.target?.result;
          if (typeof texto === "string") {
            e.response.data = JSON.parse(texto);
          }
          analyzeError(e);
        };
        reader.readAsText(e.response.data);
      }
    });

  return alert;
}
