export type GlobeRequest = {
  countryId: string;
  nonce: number;
};

let pendingRequest: GlobeRequest | null = null;
let nextNonce = 0;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function requestCountry(countryId: string) {
  pendingRequest = {
    countryId,
    nonce: ++nextNonce,
  };
  notify();
}

export function consumeRequest() {
  const request = pendingRequest;
  pendingRequest = null;
  if (request) {
    notify();
  }
  return request;
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  return pendingRequest;
}

export function getServerSnapshot() {
  return null;
}
