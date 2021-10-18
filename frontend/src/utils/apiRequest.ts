const URI = 'https://infoparser.herokuapp.com/api';

export const getTopics = async () => {

  const response = await fetch(`${URI}/topic/`);
  const { topics } = await response.json() as { topics: string[] };

  return topics;
}

