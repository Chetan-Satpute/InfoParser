export interface IPassage {
  id: number;
  content: string;
  topic: number;
}

export interface ITopic {
  id: number;
  title: string;
}

const LOCALURI = "http://localhost:8000/api";
const REMOTEURI = "https://infoparser.herokuapp.com/api";
const URI = REMOTEURI;

export async function getData<T>(route: string): Promise<T> {
  const response = await fetch(`${URI}${route}`);
  const data = (await response.json()) as T;

  return data;
}

export async function setPassage(data: IPassage): Promise<IPassage> {
  const response = await fetch(`${URI}/passage/${data.id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  const resultData = (await response.json()) as IPassage;

  return resultData;
}

export async function deletePassage(id: number) {
  await fetch(`${URI}/passage/${id}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
}

export async function newPassage(topicId: number): Promise<IPassage> {
  const data = {
    content: "Passage Data",
    topic: topicId,
  };

  const response = await fetch(`${URI}/passage/`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "omit", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  const resultData = (await response.json()) as IPassage;

  return resultData;
}
