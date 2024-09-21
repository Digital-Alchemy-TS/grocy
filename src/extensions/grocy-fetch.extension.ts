import { TServiceParams } from "@digital-alchemy/core";

const AUTH_HEADER = "GROCY-API-KEY";

export function GrocyFetch({ lifecycle, context, config, grocy }: TServiceParams) {
  const fetch = grocy.internal({ context });

  lifecycle.onPostConfig(() => {
    fetch.base_url = config.grocy.BASE_URL;
    fetch.base_headers = { [AUTH_HEADER]: config.grocy.API_KEY };
  });

  return fetch.exec;
}
