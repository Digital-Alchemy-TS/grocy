import { TServiceParams, ZCC } from "@digital-alchemy/core";

const AUTH_HEADER = "GROCY-API-KEY";

export function GrocyFetch({ lifecycle, context, config }: TServiceParams) {
  const fetch = ZCC.createFetcher({ context });

  lifecycle.onPostConfig(() => {
    fetch.setBaseUrl(config.grocy.BASE_URL);
    fetch.setHeaders({ [AUTH_HEADER]: config.grocy.API_KEY });
  });

  return fetch.fetch;
}
