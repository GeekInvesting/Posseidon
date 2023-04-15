import { Country } from "~~/model/Country";
import { State } from "~~/model/State";
import { StateDto } from "~~/model/StateDto";

let heraUrl = 'http://localhost:8100/hera'

export function ApiHera() {
    const getAllCountry = async () => {
        const response = await fetch(`${heraUrl}/country/all`);
        return response;
  }

  const requestCountry = async (data: any, method: any, country: Country) => {
    const url = `${heraUrl}/country/${data}/${country.id}`;
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
  }

  const postCountry = async (country: Country, typeSave: string) => {
    let urlApi = "";
    let urlType = "";

    if (typeSave == "create") {
      urlApi = `${heraUrl}/country`;
      urlType = "POST";
    } else if (typeSave == "update") {
      urlApi = `${heraUrl}/country/${country.id}`;
      urlType = "PUT";
    }
    const response = await fetch(`${urlApi}`, {
      method: `${urlType}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(country),
    });

    return response;
  }

  const getAllCountryName = async () => {
    const response = await fetch(`${heraUrl}/country/name`);
    return response;
  }

  const getAllState = async () => {
    const response = await fetch(`${heraUrl}/state/all`);
    return response;
  }

  const requestState = async (data: any, method: any, state: State) => {
    const url = `${heraUrl}/state/${data}/${state.id}`;
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
  }

  const postState = async (state: StateDto, typeSave: string) => {
    let urlApi = "";
    let urlType = "";

    if (typeSave == "create") {
      urlApi = `${heraUrl}/state`;
      urlType = "POST";
    } else if (typeSave == "update") {
      urlApi = `${heraUrl}/state/${state.id}`;
      urlType = "PUT";
    }
    const response = await fetch(`${urlApi}`, {
      method: `${urlType}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });

    return response;
  }

  return {
    getAllCountry,
    requestCountry,
    postCountry,
    getAllCountryName,
    getAllState,
    requestState,
    postState,
  }
}
